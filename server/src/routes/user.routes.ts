import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", authenticate, getProfile);
router.patch("/me", authenticate, updateProfile);

export default router;
