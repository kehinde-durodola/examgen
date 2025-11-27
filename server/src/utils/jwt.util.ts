import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as jwt.SignOptions);
};

export const verifyToken = (token: string): { userId: string } => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
