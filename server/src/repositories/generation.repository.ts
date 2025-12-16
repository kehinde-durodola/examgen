import { prisma } from "../config/database.js";

export const create = async (data: {
  userId: string;
  sourceType: string;
  sourceName: string;
  questionCount: number;
  difficulty: string;
}) => {
  return await prisma.generation.create({
    data: {
      ...data,
      status: "processing",
    },
  });
};

export const findById = async (id: string) => {
  return await prisma.generation.findUnique({
    where: { id },
    include: {
      questions: true,
    },
  });
};

export const findByUserId = async (userId: string) => {
  return await prisma.generation.findMany({
    where: {
      userId,
      status: {
        not: "failed",
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const updateStatus = async (
  id: string,
  status: "completed" | "failed"
) => {
  return await prisma.generation.update({
    where: { id },
    data: { status },
  });
};

export const updateScore = async (id: string, score: number) => {
  return await prisma.generation.update({
    where: { id },
    data: { score },
  });
};

export const deleteExpired = async () => {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

  return await prisma.generation.deleteMany({
    where: {
      createdAt: {
        lt: twentyFourHoursAgo,
      },
    },
  });
};

export const findProcessingByUserId = async (userId: string) => {
  return await prisma.generation.findFirst({
    where: {
      userId,
      status: "processing",
    },
  });
};
