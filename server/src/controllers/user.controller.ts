import { Request, Response, NextFunction } from "express";
import { findById, update } from "../repositories/user.repository.js";
import { successResponse } from "../utils/response.util.js";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await findById(req.user!.id);
    return successResponse(res, user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await update(req.user!.id, { name, email });
    return successResponse(res, updatedUser, "Profile updated");
  } catch (error) {
    next(error);
  }
};
