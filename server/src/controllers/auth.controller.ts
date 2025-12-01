import { Request, Response, NextFunction } from "express";
import {
  register as registerService,
  login as loginService,
} from "../services/auth.service.js";
import { findById } from "../repositories/user.repository.js";
import { successResponse } from "../utils/response.util.js";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name } = req.body;
    const result = await registerService(email, password, name);
    return successResponse(res, result, "Registration successful", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const result = await loginService(email, password);
    return successResponse(res, result, "Login successful");
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (
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
