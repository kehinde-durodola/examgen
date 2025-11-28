import { findByGenerationId } from "../repositories/question.repository.js";
import {
  findById as findGenerationById,
  updateScore,
} from "../repositories/generation.repository.js";

export const getQuestions = async (generationId: string, userId: string) => {
  const generation = await findGenerationById(generationId);

  if (!generation) {
    throw new Error("Generation not found");
  }

  if (generation.userId !== userId) {
    throw new Error("Unauthorized");
  }

  const questions = await findByGenerationId(generationId);

  return questions.map((q) => ({
    id: q.id,
    questionText: q.questionText,
    options: q.options,
    explanation: q.explanation,
  }));
};

export const submitScore = async (
  generationId: string,
  userId: string,
  score: number
) => {
  const generation = await findGenerationById(generationId);

  if (!generation) {
    throw new Error("Generation not found");
  }

  if (generation.userId !== userId) {
    throw new Error("Unauthorized");
  }

  if (score < 0 || score > 100) {
    throw new Error("Score must be between 0 and 100");
  }

  const updated = await updateScore(generationId, score);

  return {
    success: true,
    score: updated.score,
  };
};
