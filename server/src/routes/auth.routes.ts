import { Router } from "express";
import {
  register,
  login,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { registerSchema, loginSchema } from "../validation/schemas.js";
import {
  registrationLimiter,
  loginLimiter,
  authenticatedLimiter,
} from "../middlewares/rate-limit.middleware.js";

const router = Router();

router.post(
  "/register",
  registrationLimiter,
  validate(registerSchema),
  register
);
router.post("/login", loginLimiter, validate(loginSchema), login);
router.get("/me", authenticate, authenticatedLimiter, getCurrentUser);

export default router;
