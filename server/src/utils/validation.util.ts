import { MIN_CHARS_PER_QUESTION } from "../../../shared/index.js";

export const validateTextLength = (
  text: string,
  questionCount: number
): { valid: boolean; error?: string } => {
  const requiredChars = questionCount * MIN_CHARS_PER_QUESTION;
  const actualChars = text.trim().length;

  if (actualChars < requiredChars) {
    return {
      valid: false,
      error: `Text too short. Need at least ${requiredChars} characters for ${questionCount} questions (currently ${actualChars} characters)`,
    };
  }

  return { valid: true };
};
