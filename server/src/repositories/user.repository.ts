import { prisma } from "../config/database.js";

export const findById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

export const findByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const create = async (data: {
  email: string;
  password: string;
  name?: string;
}) => {
  return await prisma.user.create({
    data,
  });
};

export const updateTokens = async (userId: string, tokensRemaining: number) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      tokensRemaining,
      tokensLastRefreshed: new Date(),
    },
  });
};

export const update = async (
  userId: string,
  data: { name?: string; email?: string }
) => {
  return await prisma.user.update({
    where: { id: userId },
    data,
  });
};

export const decrementTokens = async (userId: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      tokensRemaining: {
        decrement: 1,
      },
    },
  });
};

export const incrementTokens = async (userId: string) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      tokensRemaining: {
        increment: 1,
      },
    },
  });
};

export const resetAllTokens = async () => {
  return await prisma.user.updateMany({
    data: {
      tokensRemaining: 3,
      tokensLastRefreshed: new Date(),
    },
  });
};
