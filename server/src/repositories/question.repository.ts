import { prisma } from "../config/database.js";

export const createMany = async (
  generationId: string,
  questions: Array<{
    questionText: string;
    options: { A: string; B: string; C: string; D: string };
    correctAnswer: string;
    explanation: string;
  }>
) => {
  const data = questions.map((q) => ({
    generationId,
    questionText: q.questionText,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
  }));

  return await prisma.question.createMany({
    data,
  });
};

export const findByGenerationId = async (generationId: string) => {
  return await prisma.question.findMany({
    where: { generationId },
  });
};

export const findById = async (id: string) => {
  return await prisma.question.findUnique({
    where: { id },
  });
};
