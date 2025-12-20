import { z } from "zod";
import { MAX_TEXT_LENGTH } from "../constants/index.js";

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const createGenerationSchema = z.object({
  questionCount: z.coerce.number().int().min(5).max(20),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  textInput: z
    .string()
    .min(250, "Text must be at least 250 characters")
    .max(
      MAX_TEXT_LENGTH,
      `Text must not exceed ${MAX_TEXT_LENGTH.toLocaleString()} characters`
    )
    .optional(),
});

export const updateScoreSchema = z.object({
  score: z.coerce.number().min(0).max(100),
});
