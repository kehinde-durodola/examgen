import { Router } from "express";
import {
  getQuestions,
  submitScore,
} from "../controllers/question.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { updateScoreSchema } from "../../../shared/index.js";

const router = Router();

router.get("/:id/questions", authenticate, getQuestions);
router.post(
  "/:id/score",
  authenticate,
  validate(updateScoreSchema),
  submitScore
);

export default router;
