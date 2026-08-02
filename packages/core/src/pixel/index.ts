export type {
  PixelOdor,
  MatrixSize,
  NoisePercentOfOff,
  DistractorBias,
  DifficultySettings,
  SessionMode,
  SessionMeta,
  CellKind,
  BuiltQuestion,
  BuiltSession,
  AnswerOutcome,
  ResultSummary,
  PatternDiff,
} from './types';

export {
  PIXEL_GAME_VERSION,
  PIXEL_SEED_VERSION,
  getPixelVersions,
} from './versions';

export {
  DEFAULT_PRACTICE_SETTINGS,
  PIXEL_PRESETS,
  listMatrixSizes,
  listNoisePercents,
  getPreset,
  mergePracticeSettings,
} from './presets';

export {
  cellFeatures,
  activeCellCount,
  rawOdorPattern,
  patternsForSize,
  odorPattern,
  assertPatternsUnique,
} from './pattern';

export { similarity, rankBySimilarity, nearestOdor } from './similarity';

export {
  noiseCountForOffCells,
  injectNoise,
  patternDiff,
} from './noise';

export {
  pickSessionPool,
  buildQuestionOptions,
  buildAnswerSchedule,
  buildQuestions,
} from './questions';

export {
  initialScore,
  maxScore,
  applyAnswer,
  clampScore,
  summarizeResult,
} from './scoring';

export {
  createPracticeSeed,
  createDailySeed,
  todayUTC,
  buildSessionMeta,
  buildSession,
  buildPracticeSession,
  buildDailySession,
  replaySession,
} from './session';

export { CONTENT_VERSION_PLACEHOLDER } from './content-version';

export {
  questionIdForRound,
  roundFromQuestionId,
  toPublicQuestion,
  toPublicSession,
  assertNoAnswerLeak,
  PIXEL_ANSWER_LEAK_KEYS,
  type PublicPixelQuestion,
  type PublicPixelSession,
} from './public';

export {
  PIXEL_STORAGE_KEY,
  PIXEL_STORAGE_VERSION,
  DEFAULT_PIXEL_STORED_STATE,
  migratePixelStoredState,
  parsePixelStoredJson,
  recordPlayedSeed,
  recordBestScore,
  type PixelStoredState,
} from './storage';
