import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { errorResponse } from "../utils/response.util.js";

export const validate = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const details = error.issues.map((err) => ({
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
      next(error);
    }
  };
};
