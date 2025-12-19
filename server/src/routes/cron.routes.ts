/**
 * Cron Webhook Endpoints
 *
 * These endpoints provide HTTP access to scheduled task functions,
 * enabling manual execution and external monitoring.
 *
 * Primary use cases:
 * - Manual triggering for testing or emergency operations
 * - Integration with external monitoring services
 * - On-demand task execution via API calls
 *
 * Note: Scheduled execution is handled by internal cron jobs (see /cron folder).
 * These endpoints call the same underlying functions but via HTTP.
 *
 * Security: All endpoints require CRON_SECRET environment variable
 * to be passed in the X-Cron-Secret header.
 *
 * Usage:
 * POST /api/cron/refresh-tokens
 * POST /api/cron/cleanup-generations
 * Header: X-Cron-Secret: your-secret-value
 */

import express from "express";
import { resetAllTokens } from "../repositories/user.repository.js";
import { deleteExpired } from "../repositories/generation.repository.js";
import { successResponse } from "../utils/response.util.js";
import { logger } from "../utils/logger.util.js";
import { env } from "../config/env.js";

const router = express.Router();

router.post("/refresh-tokens", async (req, res) => {
  try {
    const secret = req.headers["x-cron-secret"];

    if (!env.CRON_SECRET) {
      logger.warn("[CRON-WEBHOOK] CRON_SECRET not configured");
      return res.status(500).json({
        success: false,
        error: "Cron secret not configured on server",
      });
    }

    if (secret !== env.CRON_SECRET) {
      logger.warn("[CRON-WEBHOOK] Unauthorized token refresh attempt");
      return res.status(403).json({
        success: false,
        error: "Unauthorized",
      });
    }

    logger.info("[CRON-WEBHOOK] Token refresh triggered via webhook");

    const result = await resetAllTokens();

    logger.info(
      `[CRON-WEBHOOK] Token refresh complete: ${result.count} users updated`
    );

    return successResponse(
      res,
      { usersUpdated: result.count },
      "Tokens refreshed successfully"
    );
  } catch (error) {
    logger.error("[CRON-WEBHOOK] Token refresh failed:", error);
    return res.status(500).json({
      success: false,
      error: "Token refresh failed",
    });
  }
});

router.post("/cleanup-generations", async (req, res) => {
  try {
    const secret = req.headers["x-cron-secret"];

    if (!env.CRON_SECRET) {
      logger.warn("[CRON-WEBHOOK] CRON_SECRET not configured");
      return res.status(500).json({
        success: false,
        error: "Cron secret not configured on server",
      });
    }

    if (secret !== env.CRON_SECRET) {
      logger.warn("[CRON-WEBHOOK] Unauthorized cleanup attempt");
      return res.status(403).json({
        success: false,
        error: "Unauthorized",
      });
    }

    logger.info("[CRON-WEBHOOK] Generation cleanup triggered via webhook");

    const result = await deleteExpired();

    if (result.count > 0) {
      logger.info(
        `[CRON-WEBHOOK] Cleanup complete: ${result.count} generations deleted`
      );
    } else {
      logger.info("[CRON-WEBHOOK] No expired generations to delete");
    }

    return successResponse(
      res,
      { generationsDeleted: result.count },
      "Cleanup completed successfully"
    );
  } catch (error) {
    logger.error("[CRON-WEBHOOK] Cleanup failed:", error);
    return res.status(500).json({
      success: false,
      error: "Cleanup failed",
    });
  }
});

export default router;
