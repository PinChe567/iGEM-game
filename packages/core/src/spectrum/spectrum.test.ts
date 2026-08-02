import { describe, expect, it } from 'vitest';
import {
  SPECTRUM_CONTENT_VERSION,
  SPECTRUM_ODOR_IDS,
  SPECTRUM_ODORS,
  signatureMap,
  spectrumPool,
} from '@suite/content';
import {
  SPECTRUM_RULE_VERSION,
  SPECTRUM_RULES,
  SPECTRUM_PRESETS,
  canonicalizeMixture,
  mixturesEqual,
  mixtureKey,
  validateMixture,
  enumeratePercentCompositions,
  enumerateLegalMixtures,
  pickTruthBySeed,
  buildPuzzle,
  linearMix,
  applySaturation,
  applyNoise,
  computeSignals,
  scoreAB,
  formatAB,
  isPerfectAB,
  signalFitScore,
  filterCandidates,
  truthSurvivesFilter,
  getPreset,
  toPublicPuzzle,
  assertNoTruthLeak,
  type CanonicalMixture,
  type FeedbackEntry,
} from './index';

const SIGS = signatureMap();
const ALL_IDS = [...SPECTRUM_ODOR_IDS];
const POOL10 = ALL_IDS.slice(0, 10);

function mix(parts: Array<[string, number]>): CanonicalMixture {
  return canonicalizeMixture(parts.map(([odorId, percent]) => ({ odorId, percent })));
}

describe('spectrum rules versioning', () => {
  it('keeps k / noise / rounding / fit inside SPECTRUM_RULES', () => {
    expect(SPECTRUM_RULES.ruleVersion).toBe(SPECTRUM_RULE_VERSION);
    expect(SPECTRUM_RULES.saturationK).toBeGreaterThan(0);
    expect(SPECTRUM_RULES.channelCount).toBe(12);
  });

  it('defines easy / hard presets', () => {
    expect(SPECTRUM_PRESETS.easy).toMatchObject({
      odorCount: 6,
      componentCountMin: 2,
      componentCountMax: 3,
      showSignatureHints: true,
      revealComponentCount: true,
      mixingModel: 'linear',
    });
    expect(SPECTRUM_PRESETS.hard).toMatchObject({
      odorCount: 10,
      componentCountMin: 2,
      componentCountMax: 4,
      showSignatureHints: true,
      revealComponentCount: false,
      mixingModel: 'saturated',
    });
  });
});

describe('mixture canonical + validation', () => {
  it('is order-independent and rejects duplicates', () => {
    const a = canonicalizeMixture([
      { odorId: 'lemon', percent: 40 },
      { odorId: 'banana', percent: 60 },
    ]);
    const b = canonicalizeMixture([
      { odorId: 'banana', percent: 60 },
      { odorId: 'lemon', percent: 40 },
    ]);
    expect(mixturesEqual(a, b)).toBe(true);

    const bad = validateMixture([
      { odorId: 'banana', percent: 50 },
      { odorId: 'banana', percent: 50 },
    ]);
    expect(bad.ok).toBe(false);
  });

  it('allows selecting a subset; unused pool odors are simply omitted (=0%)', () => {
    const ok = validateMixture(
      [
        { odorId: 'banana', percent: 30 },
        { odorId: 'mint', percent: 30 },
        { odorId: 'rose', percent: 40 },
      ],
      {
        minPercent: 10,
        percentStep: 10,
        componentCountMin: 2,
        componentCountMax: 4,
      },
    );
    expect(ok.ok).toBe(true);
  });
});

describe('participating-odor A/B scoring', () => {
  it('scores only truth components; perfect match is kA0B', () => {
    const truth = mix([
      ['banana', 60],
      ['lemon', 40],
    ]);
    const exact = mix([
      ['banana', 60],
      ['lemon', 40],
    ]);
    const swapped = mix([
      ['banana', 40],
      ['lemon', 60],
    ]);
    const unrelated = mix([
      ['mint', 60],
      ['rose', 40],
    ]);

    expect(formatAB(scoreAB(exact, truth, POOL10))).toBe('2A0B');
    expect(isPerfectAB(scoreAB(exact, truth, POOL10), 2)).toBe(true);

    // both present wrong % → 0A2B; absent pool odors ignored
    expect(formatAB(scoreAB(swapped, truth, POOL10))).toBe('0A2B');

    // missed both participating odors → 0A0B
    expect(formatAB(scoreAB(unrelated, truth, POOL10))).toBe('0A0B');
  });

  it('designated 0A2B case on a 2-odor pool (both present, wrong %)', () => {
    const pool2 = ['banana', 'lemon'] as const;
    const truth = mix([
      ['banana', 60],
      ['lemon', 40],
    ]);
    const swapped = mix([
      ['banana', 40],
      ['lemon', 60],
    ]);
    expect(formatAB(scoreAB(swapped, truth, pool2))).toBe('0A2B');
  });

  it('component-order permutation yields same A/B', () => {
    const forward = mix([
      ['banana', 60],
      ['lemon', 40],
    ]);
    const reverse = canonicalizeMixture([
      { odorId: 'lemon', percent: 40 },
      { odorId: 'banana', percent: 60 },
    ]);
    const other = mix([
      ['mint', 50],
      ['rose', 50],
    ]);
    expect(scoreAB(forward, other, POOL10)).toEqual(scoreAB(reverse, other, POOL10));
  });
});

describe('signal model', () => {
  it('saturation stays in [0,1] and is monotone', () => {
    const xs = [0, 0.1, 0.25, 0.5, 0.75, 1];
    const ys = applySaturation(xs);
    for (let i = 1; i < ys.length; i += 1) {
      expect(ys[i]!).toBeGreaterThanOrEqual(ys[i - 1]!);
    }
  });

  it('noise clamps to [0,1]', () => {
    const edge = Array.from({ length: 12 }, () => 0.99);
    for (const v of applyNoise(edge, 'clamp-seed')) {
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThanOrEqual(1);
    }
  });

  it('same seed/rule/content yields identical truth and signal', () => {
    const seed = 'replay-demo-seed';
    const a = buildPuzzle({
      seed,
      difficulty: 'hard',
      signatures: SIGS,
      odorIds: ALL_IDS,
      contentVersion: SPECTRUM_CONTENT_VERSION,
    });
    const b = buildPuzzle({
      seed,
      difficulty: 'hard',
      signatures: SIGS,
      odorIds: ALL_IDS,
      contentVersion: SPECTRUM_CONTENT_VERSION,
    });
    expect(a.poolIds).toEqual(POOL10);
    expect(mixtureKey(a.truth)).toBe(mixtureKey(b.truth));
    expect(a.observedSignal).toEqual(b.observedSignal);
  });
});

describe('signal fit', () => {
  it('returns clamped 0–100', () => {
    const v = Array.from({ length: 12 }, () => 0.5);
    expect(signalFitScore(v, v)).toBe(100);
  });
});

describe('generator + candidate filter', () => {
  it('enumerates only legal ratios for easy/hard', () => {
    for (const id of ['easy', 'hard'] as const) {
      const preset = getPreset(id);
      const legal = enumerateLegalMixtures({ odorIds: ALL_IDS, preset });
      expect(legal.length).toBeGreaterThan(0);
      for (const m of legal) {
        const v = validateMixture(m.components, {
          minPercent: preset.minPercent,
          percentStep: preset.percentStep,
          componentCountMin: preset.componentCountMin,
          componentCountMax: preset.componentCountMax,
        });
        expect(v.ok).toBe(true);
        expect(m.components.reduce((s, c) => s + c.percent, 0)).toBe(100);
      }
    }
  });

  it('keeps truth in candidates after A/B feedback', () => {
    const seed = 'filter-survival';
    const puzzle = buildPuzzle({
      seed,
      difficulty: 'easy',
      signatures: SIGS,
      odorIds: ALL_IDS,
      contentVersion: SPECTRUM_CONTENT_VERSION,
    });
    const legal = enumerateLegalMixtures({
      odorIds: ALL_IDS,
      preset: getPreset('easy'),
    });
    const history: FeedbackEntry[] = [];
    const probes: CanonicalMixture[] = [
      mix([
        ['banana', 40],
        ['lemon', 60],
      ]),
      mix([
        ['mint', 50],
        ['rose', 50],
      ]),
      puzzle.truth,
    ];
    let candidates = legal;
    for (const guess of probes) {
      const ab = scoreAB(guess, puzzle.truth, puzzle.poolIds);
      history.push({ guess, ab });
      candidates = filterCandidates(candidates, {
        history,
        poolIds: puzzle.poolIds,
      });
      expect(truthSurvivesFilter(puzzle.truth, legal, { history, poolIds: puzzle.poolIds })).toBe(
        true,
      );
      expect(candidates.some((c) => mixturesEqual(c, puzzle.truth))).toBe(true);
    }
  });

  it('exact truth is fully matchable (10A)', () => {
    const puzzle = buildPuzzle({
      seed: 'exact-matchable',
      difficulty: 'easy',
      signatures: SIGS,
      odorIds: ALL_IDS,
      contentVersion: SPECTRUM_CONTENT_VERSION,
    });
    const ab = scoreAB(puzzle.truth, puzzle.truth, puzzle.poolIds);
    expect(isPerfectAB(ab, puzzle.truth.components.length)).toBe(true);
    expect(linearMix(puzzle.truth, SIGS)).toEqual(puzzle.linearSignal);
  });
});

describe('property: legal mixtures never NaN / bad sums', () => {
  it(
    'stresses compositions and signals',
    () => {
      const compositions = [
        ...enumeratePercentCompositions(2, 100, 10, 10),
        ...enumeratePercentCompositions(3, 100, 10, 10),
        ...enumeratePercentCompositions(4, 100, 10, 10),
      ];
      expect(compositions.length).toBeGreaterThan(50);
      for (const percents of compositions) {
        expect(percents.reduce((s, p) => s + p, 0)).toBe(100);
      }

      const legalByDiff = {
        easy: enumerateLegalMixtures({ odorIds: ALL_IDS, preset: getPreset('easy') }),
        hard: enumerateLegalMixtures({ odorIds: ALL_IDS, preset: getPreset('hard') }),
      } as const;

      for (const difficulty of ['easy', 'hard'] as const) {
        const legal = legalByDiff[difficulty];
        const model = getPreset(difficulty).mixingModel;
        for (let i = 0; i < 40; i += 1) {
          const seed = `prop-${difficulty}-${i}`;
          const truth = pickTruthBySeed(legal, seed);
          const signals = computeSignals(truth, SIGS, model, seed);
          for (const v of signals.observed) {
            expect(Number.isFinite(v)).toBe(true);
            expect(v).toBeGreaterThanOrEqual(0);
            expect(v).toBeLessThanOrEqual(1);
          }
        }
      }
    },
    60_000,
  );

  it('content pool sizes match presets', () => {
    expect(spectrumPool(10)).toHaveLength(10);
    expect(SPECTRUM_ODORS).toHaveLength(16);
  });
});

describe('spectrum public online sanitizer', () => {
  it('strips truth and private signals from public puzzle', () => {
    const puzzle = buildPuzzle({
      seed: 'public-sanitize',
      difficulty: 'easy',
      signatures: SIGS,
      odorIds: ALL_IDS,
      contentVersion: SPECTRUM_CONTENT_VERSION,
    });
    const pub = toPublicPuzzle(puzzle);
    expect(pub.observedSignal).toEqual([...puzzle.observedSignal]);
    expect(pub.poolIds).toEqual([...puzzle.poolIds]);
    expect(pub.truthComponentCount).toBe(puzzle.truth.components.length);
    assertNoTruthLeak(pub);
    expect(() => assertNoTruthLeak(puzzle)).toThrow(/truth_leak/);
  });
});
