import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util.js";
import { prisma } from "../config/database.js";
import { errorResponse } from "../utils/response.util.js";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, "Authentication required", 401, "UNAUTHORIZED");
    }

    const token = authHeader.substring(7);

    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true },
    });

    if (!user) {
      return errorResponse(res, "User not found", 401, "UNAUTHORIZED");
    }

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, "Invalid or expired token", 401, "UNAUTHORIZED");
  }
};
