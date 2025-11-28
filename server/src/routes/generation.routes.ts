import { Router } from "express";
import {
  create,
  getById,
  getAll,
} from "../controllers/generation.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { checkTokens } from "../middlewares/token.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.post("/", authenticate, checkTokens, upload.single("file"), create);
router.get("/:id", authenticate, getById);
router.get("/", authenticate, getAll);

export default router;
