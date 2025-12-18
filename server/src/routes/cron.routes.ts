/**
 * Cron Webhook Endpoints
 *
 * These endpoints allow external cron services to trigger scheduled tasks.
 * This is necessary when hosting on platforms that automatically spin down
 * inactive servers after periods of inactivity.
 *
 * How it works:
 * - External cron service (e.g., cron-job.org) calls these endpoints on schedule
 * - HTTP request wakes up sleeping server (if needed)
 * - Endpoint executes the scheduled task
 * - Server responds with success/failure
 *
 * For production deployments with always-active servers, the internal
 * cron jobs (see /cron folder) handle scheduling automatically without
 * needing these endpoints. However, having both provides redundancy.
 *
 * Security: All endpoints require CRON_SECRET environment variable
 * to be passed in the X-Cron-Secret header.
 *
 * Setup Instructions:
 * 1. Set CRON_SECRET environment variable (generate a secure random string)
 * 2. Create account on cron-job.org (or similar service)
 * 3. Add jobs to call these endpoints:
 *    - POST /api/cron/refresh-tokens (schedule: 0 0 * * * - daily at midnight UTC)
 *    - POST /api/cron/cleanup-generations (schedule: 0 * * * * - every hour)
 * 4. Add header to requests: X-Cron-Secret: your-secret-value
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
