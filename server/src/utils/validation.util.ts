import { MIN_CHARS_PER_QUESTION, MAX_TEXT_LENGTH } from "../constants/index.js";

export const validateTextLength = (
  text: string,
  questionCount: number
): void => {
  const minCharacters = questionCount * MIN_CHARS_PER_QUESTION;

  if (text.length < minCharacters) {
    throw new Error(
      `Text is too short. Please provide at least ${minCharacters} characters for ${questionCount} questions. Your text has ${text.length} characters.`
    );
  }

  if (text.length > MAX_TEXT_LENGTH) {
    throw new Error(
      `Text is too long. Maximum allowed is ${MAX_TEXT_LENGTH.toLocaleString()} characters. Your text has ${text.length.toLocaleString()} characters.`
    );
  }
};
