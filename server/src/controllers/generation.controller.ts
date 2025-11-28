import { Request, Response, NextFunction } from "express";
import {
  createGenerationService,
  getGeneration,
  getUserGenerations,
} from "../services/generation.service.js";
import { successResponse } from "../utils/response.util.js";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { textInput, questionCount, difficulty } = req.body;
    const file = req.file;

    const result = await createGenerationService(
      req.user!.id,
      file,
      textInput,
      Number(questionCount),
      difficulty
    );

    return successResponse(res, result, "Generation created", 201);
  } catch (error) {
    next(error);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const generation = await getGeneration(id, req.user!.id);
    return successResponse(res, generation);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const generations = await getUserGenerations(req.user!.id);
    return successResponse(res, generations);
  } catch (error) {
    next(error);
  }
};
