import { Router } from "express";
import { getTokenInfo } from "../controllers/token.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticate, getTokenInfo);

export default router;
