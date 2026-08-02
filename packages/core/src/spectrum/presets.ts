import type { DifficultyId, DifficultyPreset } from './types';

/**
 * Easy / hard presets for Scent Spectrum.
 * Percent 0% means unused; only >0 components enter the mixture / A/B.
 */
export const SPECTRUM_PRESETS: Record<DifficultyId, DifficultyPreset> = {
  easy: {
    id: 'easy',
    odorCount: 6,
    componentCountMin: 2,
    componentCountMax: 3,
    percentStep: 10,
    minPercent: 10,
    maxGuesses: 8,
    mixingModel: 'linear',
    showSignatureHints: true,
    revealComponentCount: true,
  },
  hard: {
    id: 'hard',
    odorCount: 10,
    componentCountMin: 2,
    componentCountMax: 4,
    percentStep: 10,
    minPercent: 10,
    maxGuesses: 10,
    mixingModel: 'saturated',
    showSignatureHints: true,
    revealComponentCount: false,
  },
};

export function getPreset(id: DifficultyId): DifficultyPreset {
  return SPECTRUM_PRESETS[id];
}
