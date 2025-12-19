import { Router } from "express";
import { submitScore } from "../controllers/question.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { updateScoreSchema } from "../validation/schemas.js";
import { authenticatedLimiter } from "../middlewares/rate-limit.middleware.js";

const router = Router();

router.post(
  "/:id/score",
  authenticate,
  authenticatedLimiter,
  validate(updateScoreSchema),
  submitScore
);

export default router;
