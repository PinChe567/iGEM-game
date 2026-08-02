import { describe, expect, it } from 'vitest';
import { toLegacyOdors } from '@suite/content';
import {
  assertPatternsUnique,
  patternsForSize,
  injectNoise,
  noiseCountForOffCells,
  buildSession,
  buildSessionMeta,
  buildPracticeSession,
  applyAnswer,
  clampScore,
  summarizeResult,
  mergePracticeSettings,
  listNoisePercents,
  parsePixelStoredJson,
  migratePixelStoredState,
  PIXEL_GAME_VERSION,
  PIXEL_SEED_VERSION,
  toPublicQuestion,
  toPublicSession,
  assertNoAnswerLeak,
  type PixelOdor,
} from './index';

function catalog(): PixelOdor[] {
  return toLegacyOdors().map((o) => ({ id: o.id, vector: o.vector }));
}

describe('pixel patterns', () => {
  for (const size of [3, 4, 5, 6, 7] as const) {
    it(`is deterministic and unique at ${size}×${size}`, () => {
      const odors = catalog();
      const a = patternsForSize(odors, size);
      const b = patternsForSize(odors, size);
      assertPatternsUnique(a);
      for (const odor of odors) {
        expect(a.get(odor.id)).toEqual(b.get(odor.id));
      }
      expect(a.size).toBe(20);
    });
  }
});

describe('pixel noise (fixed count of OFF cells)', () => {
  it('lists 0/10/20/30/40 percents', () => {
    expect([...listNoisePercents()]).toEqual([0, 10, 20, 30, 40]);
  });

  it('never covers base-on cells and reports exact count', () => {
    const odors = catalog();
    const patterns = patternsForSize(odors, 5);
    const base = patterns.get('banana')!;
    const off = base.filter((on) => !on).length;
    for (const percent of listNoisePercents()) {
      const expected = noiseCountForOffCells(off, percent);
      const result = injectNoise(base, percent, `noise-test-${percent}`);
      expect(result.noiseCount).toBe(expected);
      expect(result.noiseIndices).toHaveLength(expected);
      for (const index of result.noiseIndices) {
        expect(base[index]).toBe(false);
        expect(result.displayCells[index]).toBe('noise');
      }
      base.forEach((on, index) => {
        if (on) expect(result.displayCells[index]).toBe('on');
      });
    }
  });

  it('0% yields zero noise', () => {
    const base = [true, false, false, true];
    const result = injectNoise(base, 0, 'z');
    expect(result.noiseCount).toBe(0);
    expect(result.noiseIndices).toEqual([]);
  });
});

describe('pixel session seeds', () => {
  it('same seed ⇒ identical pool, questions, options, noise', () => {
    const odors = catalog();
    const settings = mergePracticeSettings({
      matrixSize: 5,
      noisePercentOfOff: 20,
      distractorBias: 'similar',
    });
    const meta = buildSessionMeta({
      seed: 'fixed-seed-alpha',
      mode: 'practice',
      presetId: 'practice',
      contentVersion: '1.0.0',
    });
    const a = buildSession({ odors, settings, meta });
    const b = buildSession({ odors, settings, meta });
    expect(a.poolIds).toEqual(b.poolIds);
    expect(a.questions).toEqual(b.questions);
    expect(a.meta.seedVersion).toBe(PIXEL_SEED_VERSION);
    expect(a.meta.gameVersion).toBe(PIXEL_GAME_VERSION);
  });

  it('different seeds change pool or questions while keeping constraints', () => {
    const odors = catalog();
    const settings = mergePracticeSettings({ matrixSize: 4, noisePercentOfOff: 10 });
    const a = buildSession({
      odors,
      settings,
      meta: buildSessionMeta({ seed: 'seed-A', mode: 'practice', presetId: 'practice' }),
    });
    const b = buildSession({
      odors,
      settings,
      meta: buildSessionMeta({ seed: 'seed-B', mode: 'practice', presetId: 'practice' }),
    });
    const same =
      JSON.stringify(a.poolIds) === JSON.stringify(b.poolIds) &&
      JSON.stringify(a.questions) === JSON.stringify(b.questions);
    expect(same).toBe(false);

    for (const session of [a, b]) {
      expect(session.poolIds).toHaveLength(6);
      expect(new Set(session.poolIds).size).toBe(6);
      expect(session.questions).toHaveLength(10);
      for (const q of session.questions) {
        expect(q.optionIds).toHaveLength(4);
        expect(new Set(q.optionIds).size).toBe(4);
        expect(q.optionIds).toContain(q.answerId);
        expect(q.noiseCount).toBe(q.noiseIndices.length);
        const onCount = q.basePattern.filter(Boolean).length;
        expect(onCount).toBeGreaterThan(0);
      }
      const answerCounts = session.questions.map((q) => q.answerId);
      // 6 unique + 4 repeats ⇒ at most 6 unique ids, all from pool
      for (const id of answerCounts) expect(session.poolIds).toContain(id);
    }
  });

  it('practice helper records versions', () => {
    const session = buildPracticeSession({
      odors: catalog(),
      seed: 'replay-me',
      contentVersion: '1.0.0',
    });
    expect(session.meta.seed).toBe('replay-me');
    expect(session.meta.contentVersion).toBe('1.0.0');
  });
});

describe('pixel scoring', () => {
  const settings = mergePracticeSettings({});

  it('rejects out-of-range and unknown choices without changing score', () => {
    expect(
      applyAnswer({
        settings,
        currentScore: 200,
        answerId: 'banana',
        optionIds: ['banana', 'lemon', 'rose', 'mint'],
        chosenId: 'not-an-option',
        alreadyAnswered: false,
      }).nextScore,
    ).toBe(200);

    expect(clampScore(Number.NaN, settings)).toBe(0);
    expect(clampScore(99999, settings)).toBe(1000);
    expect(clampScore(-50, settings)).toBe(0);
  });

  it('scores correct answers and summarizes pass/perfect', () => {
    const hit = applyAnswer({
      settings,
      currentScore: 0,
      answerId: 'banana',
      optionIds: ['banana', 'lemon', 'rose', 'mint'],
      chosenId: 'banana',
      alreadyAnswered: false,
    });
    expect(hit.correct).toBe(true);
    expect(hit.nextScore).toBe(100);

    const summary = summarizeResult(600, settings);
    expect(summary.passed).toBe(true);
    expect(summary.perfect).toBe(false);
    expect(summarizeResult(1000, settings).perfect).toBe(true);
  });
});

describe('pixel localStorage migration', () => {
  it('does not crash on corrupt or legacy payloads', () => {
    expect(parsePixelStoredJson(null).storageVersion).toBe(2);
    expect(parsePixelStoredJson('{not json').playedSeeds).toEqual([]);
    expect(migratePixelStoredState({ locale: 'fr', bestByPreset: { x: 'bad' } }).locale).toBe(
      'zh-Hant',
    );
    expect(
      migratePixelStoredState({
        storageVersion: 1,
        locale: 'en',
        muted: true,
        playedSeeds: ['a', 1, 'b'],
        bestByPreset: { practice: 400 },
      }).bestByPreset.practice,
    ).toBe(400);
  });
});

describe('pixel public online sanitizer', () => {
  it('strips answer keys from public session payloads', () => {
    const session = buildPracticeSession({
      odors: catalog(),
      seed: 'sanitize-test-seed',
      contentVersion: '1.0.0',
    });
    const pub = toPublicSession(session);
    expect(pub.questions).toHaveLength(session.questions.length);
    expect(pub.questions[0]!.questionId).toBe('q0');
    expect(pub.questions[0]!.optionIds).toEqual(session.questions[0]!.optionIds);
    expect(pub.questions[0]!.displayCells).toEqual(session.questions[0]!.displayCells);
    assertNoAnswerLeak(pub);
    expect(() => assertNoAnswerLeak(session.questions[0])).toThrow(/answer_leak/);
    expect(toPublicQuestion(session.questions[0]!)).not.toHaveProperty('answerId');
  });
});
