export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const TOKEN_STORAGE_KEY = "examgen_token";

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const MAX_FILE_SIZE_MB = 5;

export const MIN_TEXT_CHARS = 250;
