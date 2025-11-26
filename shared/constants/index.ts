export const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"] as const;
export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number];

export const QUESTION_COUNT_OPTIONS = [5, 10, 15, 20] as const;
export type QuestionCount = (typeof QUESTION_COUNT_OPTIONS)[number];

export const GENERATION_STATUS = {
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
} as const;
export type GenerationStatus =
  (typeof GENERATION_STATUS)[keyof typeof GENERATION_STATUS];

export const MAX_PDF_SIZE = 5 * 1024 * 1024;

export const DAILY_TOKEN_LIMIT = 3;

export const MIN_CHARS_PER_QUESTION = 50;
