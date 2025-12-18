import { Router } from "express";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import generationRoutes from "./generation.routes.js";
import questionRoutes from "./question.routes.js";
import cronRoutes from "./cron.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/generations", generationRoutes);
router.use("/generations", questionRoutes);
router.use("/cron", cronRoutes);

export default router;
