import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authenticatedLimiter } from "../middlewares/rate-limit.middleware.js";

const router = Router();

router.get("/me", authenticate, authenticatedLimiter, getProfile);
router.patch("/me", authenticate, authenticatedLimiter, updateProfile);

export default router;
