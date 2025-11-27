import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { errorResponse } from "../utils/response.util.js";

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      const details = error.errors?.map((err: any) => ({
        field: err.path.join("."),
        message: err.message,
      }));
      return errorResponse(
        res,
        "Validation failed",
        400,
        "VALIDATION_ERROR",
        details
      );
    }
  };
};
