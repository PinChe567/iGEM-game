import type { DifficultySettings, MatrixSize, NoisePercentOfOff } from './types';

const MATRIX_SIZES: MatrixSize[] = [3, 4, 5, 6, 7];
const NOISE_PERCENTS: NoisePercentOfOff[] = [0, 10, 20, 30, 40];

export const DEFAULT_PRACTICE_SETTINGS: DifficultySettings = {
  matrixSize: 4,
  distractorBias: 'similar',
  noisePercentOfOff: 10,
  allowStudyReview: true,
  patternDisplayMs: 0,
  poolSize: 6,
  questionCount: 10,
  optionsPerQuestion: 4,
  passCorrect: 6,
  pointsPerCorrect: 100,
};

/** Named presets — difficulty is multi-axis, not “7×7 = hardest”. */
export const PIXEL_PRESETS: Record<string, DifficultySettings> = {
  practice: { ...DEFAULT_PRACTICE_SETTINGS },
  'daily-easy': {
    matrixSize: 4,
    distractorBias: 'mixed',
    noisePercentOfOff: 0,
    allowStudyReview: true,
    patternDisplayMs: 0,
    poolSize: 6,
    questionCount: 10,
    optionsPerQuestion: 4,
    passCorrect: 6,
    pointsPerCorrect: 100,
  },
  'daily-standard': {
    matrixSize: 5,
    distractorBias: 'similar',
    noisePercentOfOff: 20,
    allowStudyReview: true,
    patternDisplayMs: 800,
    poolSize: 6,
    questionCount: 10,
    optionsPerQuestion: 4,
    passCorrect: 6,
    pointsPerCorrect: 100,
  },
  'daily-focus': {
    matrixSize: 5,
    distractorBias: 'very-similar',
    noisePercentOfOff: 10,
    allowStudyReview: false,
    patternDisplayMs: 1200,
    poolSize: 6,
    questionCount: 10,
    optionsPerQuestion: 4,
    passCorrect: 6,
    pointsPerCorrect: 100,
  },
  'daily-dense': {
    matrixSize: 6,
    distractorBias: 'similar',
    noisePercentOfOff: 30,
    allowStudyReview: true,
    patternDisplayMs: 0,
    poolSize: 6,
    questionCount: 10,
    optionsPerQuestion: 4,
    passCorrect: 6,
    pointsPerCorrect: 100,
  },
};

export function listMatrixSizes(): readonly MatrixSize[] {
  return MATRIX_SIZES;
}

export function listNoisePercents(): readonly NoisePercentOfOff[] {
  return NOISE_PERCENTS;
}

export function getPreset(presetId: string): DifficultySettings {
  const preset = PIXEL_PRESETS[presetId];
  if (!preset) throw new Error(`Unknown preset: ${presetId}`);
  return { ...preset };
}

export function mergePracticeSettings(
  partial: Partial<DifficultySettings>,
): DifficultySettings {
  return { ...DEFAULT_PRACTICE_SETTINGS, ...partial };
}
