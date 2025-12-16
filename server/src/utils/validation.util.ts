import { MIN_CHARS_PER_QUESTION } from "../constants/index.js";

export const validateTextLength = (
  text: string,
  questionCount: number
): void => {
  const requiredChars = questionCount * MIN_CHARS_PER_QUESTION;
  const actualChars = text.trim().length;

  if (actualChars < requiredChars) {
    throw new Error(
      `Text too short. Need at least ${requiredChars} characters for ${questionCount} questions (currently ${actualChars} characters)`
    );
  }
};
