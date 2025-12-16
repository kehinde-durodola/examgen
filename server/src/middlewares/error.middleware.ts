import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { errorResponse } from "../utils/response.util.js";
import { logger } from "../utils/logger.util.js";

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error("Error occurred:", {
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
    details: error.details || undefined,
  });

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return errorResponse(
        res,
        "Resource already exists",
        409,
        "DUPLICATE_ENTRY"
      );
    }
    if (error.code === "P2025") {
      return errorResponse(res, "Resource not found", 404, "NOT_FOUND");
    }
    return errorResponse(res, "Database error occurred", 500, "DATABASE_ERROR");
  }

  if (error instanceof ZodError) {
    const details = error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    const firstError = error.issues[0];
    const userMessage = firstError.message;

    return errorResponse(res, userMessage, 400, "VALIDATION_ERROR", details);
  }

  if (error.name === "JsonWebTokenError") {
    return errorResponse(res, "Invalid token", 401, "INVALID_TOKEN");
  }

  if (error.name === "TokenExpiredError") {
    return errorResponse(res, "Token expired", 401, "TOKEN_EXPIRED");
  }

  if (error.message.includes("Multer")) {
    return errorResponse(res, "File upload error", 400, "FILE_UPLOAD_ERROR");
  }

  return errorResponse(
    res,
    error.message || "Internal server error",
    500,
    error.code || "INTERNAL_ERROR",
    error.details || undefined
  );
};
