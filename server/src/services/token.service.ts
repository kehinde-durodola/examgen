import { findById, updateTokens } from "../repositories/user.repository.js";
import { prisma } from "../config/database.js";

export const consumeToken = async (userId: string) => {
  const user = await findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.tokensRemaining <= 0) {
    throw new Error("No tokens remaining");
  }

  const updatedUser = await updateTokens(userId, user.tokensRemaining - 1);

  return updatedUser;
};

export const refreshTokens = async () => {
  const result = await prisma.user.updateMany({
    where: {
      tokensRemaining: {
        lt: 3,
      },
    },
    data: {
      tokensRemaining: 3,
      tokensLastRefreshed: new Date(),
    },
  });

  return result.count;
};

export const getTokenInfo = async (userId: string) => {
  const user = await findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const now = new Date();
  const nextMidnight = new Date(now);
  nextMidnight.setUTCHours(24, 0, 0, 0);

  return {
    tokensRemaining: user.tokensRemaining,
    tokensLastRefreshed: user.tokensLastRefreshed.toISOString(),
    nextRefreshAt: nextMidnight.toISOString(),
  };
};
