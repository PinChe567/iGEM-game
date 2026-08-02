/** Illustrative virtual-receptor odor input used by Pixel Lab rules. */
export type PixelOdor = {
  id: string;
  /** 5-D illustrative feature vector — not experimental measurements. */
  vector: readonly number[];
};

export type MatrixSize = 3 | 4 | 5 | 6 | 7;

/** Fraction of originally-OFF cells turned into noise (fixed count, not per-cell Bernoulli). */
export type NoisePercentOfOff = 0 | 10 | 20 | 30 | 40;

export type DistractorBias = 'mixed' | 'similar' | 'very-similar';

export type DifficultySettings = {
  matrixSize: MatrixSize;
  distractorBias: DistractorBias;
  noisePercentOfOff: NoisePercentOfOff;
  /** Whether the player may revisit study cards before confirming the quiz. */
  allowStudyReview: boolean;
  /** How long the pattern is shown before options unlock (ms). 0 = immediate. */
  patternDisplayMs: number;
  poolSize: number;
  questionCount: number;
  optionsPerQuestion: number;
  passCorrect: number;
  pointsPerCorrect: number;
};

export type SessionMode = 'practice' | 'daily';

export type SessionMeta = {
  seed: string;
  seedVersion: string;
  contentVersion: string;
  gameVersion: string;
  mode: SessionMode;
  presetId: string;
};

export type CellKind = 'off' | 'on' | 'noise';

export type BuiltQuestion = {
  round: number;
  answerId: string;
  optionIds: string[];
  basePattern: boolean[];
  noiseIndices: number[];
  noiseCount: number;
  /** Display cells: base ON + noise on OFF cells only. */
  displayCells: CellKind[];
};

export type BuiltSession = {
  meta: SessionMeta;
  settings: DifficultySettings;
  poolIds: string[];
  questions: BuiltQuestion[];
};

export type AnswerOutcome = {
  correct: boolean;
  scoreDelta: number;
  nextScore: number;
  alreadyAnswered: boolean;
};

export type ResultSummary = {
  correctCount: number;
  score: number;
  maxScore: number;
  passed: boolean;
  perfect: boolean;
  passCorrect: number;
  questionCount: number;
};

export type PatternDiff = {
  onlyAnswer: number[];
  onlyShown: number[];
  sharedOn: number[];
};
