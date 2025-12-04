export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const TOKEN_STORAGE_KEY = "examgen_token";

export const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"] as const;

export const QUESTION_COUNTS = [5, 10, 15, 20] as const;

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
};

export const MIN_CHARS_PER_QUESTION = 50;
