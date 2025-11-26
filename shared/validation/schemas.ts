import { z } from "zod";

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
  questionCount: z.number().int().min(5).max(20),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  textInput: z.string().min(250).optional(),
});

export const updateScoreSchema = z.object({
  score: z.number().min(0).max(100),
});
