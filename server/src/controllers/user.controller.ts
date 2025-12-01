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

    if (!user) {
      throw new Error("User not found");
    }

    const { password, ...userWithoutPassword } = user;

    return successResponse(res, userWithoutPassword);
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

    const { password, ...userWithoutPassword } = updatedUser;

    return successResponse(res, userWithoutPassword, "Profile updated");
  } catch (error) {
    next(error);
  }
};
