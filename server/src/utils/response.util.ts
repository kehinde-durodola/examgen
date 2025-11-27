import { Response } from "express";
import { ApiResponse, ApiError } from "../../../shared/index.js";

export const successResponse = <T>(
  res: Response,
  data: T,
  message?: string,
  statusCode: number = 200
): Response => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    ...(message && { message }),
  };
  return res.status(statusCode).json(response);
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode: number = 400,
  code?: string,
  details?: any
): Response => {
  const response: ApiError = {
    success: false,
    error: {
      message,
      ...(code && { code }),
      ...(details && { details }),
    },
  };
  return res.status(statusCode).json(response);
};
