import { Request, Response, NextFunction } from "express";
import { getTokenInfo as getTokenInfoService } from "../services/token.service.js";
import { successResponse } from "../utils/response.util.js";

export const getTokenInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tokenInfo = await getTokenInfoService(req.user!.id);
    return successResponse(res, tokenInfo);
  } catch (error) {
    next(error);
  }
};
