import { Request, Response, NextFunction } from "express";
import { findById } from "../repositories/user.repository.js";
import { errorResponse } from "../utils/response.util.js";

export const checkTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return errorResponse(res, "Authentication required", 401, "UNAUTHORIZED");
    }

    const user = await findById(req.user.id);

    if (!user) {
      return errorResponse(res, "User not found", 401, "UNAUTHORIZED");
    }

    if (user.tokensRemaining <= 0) {
      return errorResponse(
        res,
        "No tokens remaining. Tokens refresh daily at midnight UTC.",
        403,
        "NO_TOKENS"
      );
    }

    next();
  } catch (error) {
    return errorResponse(res, "Failed to check tokens", 500, "INTERNAL_ERROR");
  }
};
