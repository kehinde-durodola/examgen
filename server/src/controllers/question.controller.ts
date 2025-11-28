import { Request, Response, NextFunction } from "express";
import {
  getQuestions as getQuestionsService,
  submitScore as submitScoreService,
} from "../services/question.service.js";
import { successResponse } from "../utils/response.util.js";

export const getQuestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const questions = await getQuestionsService(id, req.user!.id);
    return successResponse(res, questions);
  } catch (error) {
    next(error);
  }
};

export const submitScore = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { score } = req.body;
    const result = await submitScoreService(id, req.user!.id, Number(score));
    return successResponse(res, result, "Score updated");
  } catch (error) {
    next(error);
  }
};
