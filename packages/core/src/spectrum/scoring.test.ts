import { describe, expect, it } from 'vitest';
import {
  computeSpectrumScore,
  createDailySeed,
  spectrumScoreKey,
  parseSpectrumStoredJson,
  recordSpectrumBestScore,
} from './index';

describe('spectrum scoring + storage', () => {
  it('scores only within scoreKey and splits guess/time', () => {
    const solved = computeSpectrumScore({
      solved: true,
      guessesUsed: 2,
      difficulty: 'easy',
      elapsedMs: 20_000,
    });
    expect(solved.scoreKey).toBe(spectrumScoreKey('easy'));
    expect(solved.totalScore).toBe(solved.guessScore + solved.timeScore);

    const fail = computeSpectrumScore({
      solved: false,
      guessesUsed: 8,
      difficulty: 'easy',
      elapsedMs: 90_000,
    });
    expect(fail.totalScore).toBe(0);
  });

  it('records best per scoreKey only when higher', () => {
    let state = parseSpectrumStoredJson(null);
    const key = spectrumScoreKey('hard');
    state = recordSpectrumBestScore(state, key, 100);
    state = recordSpectrumBestScore(state, key, 50);
    expect(state.bestByScoreKey[key]).toBe(100);
    expect(createDailySeed('2026-08-01')).toMatch(/^sd-2026-08-01-v/);
  });
});
