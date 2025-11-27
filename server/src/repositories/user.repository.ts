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
