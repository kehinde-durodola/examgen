import cron from "node-cron";
import { deleteExpired } from "../repositories/generation.repository.js";
import { logger } from "../utils/logger.util.js";
import { env } from "../config/env.js";

export const startGenerationCleanupCron = () => {
  cron.schedule(env.GENERATION_CLEANUP_CRON, async () => {
    try {
      logger.info(
        "[GENERATION-CLEANUP] Starting cleanup of expired generations..."
      );

      const result = await deleteExpired();

      if (result.count > 0) {
        logger.info(
          `[GENERATION-CLEANUP] Deleted ${result.count} expired generations`
        );
      } else {
        logger.info("[GENERATION-CLEANUP] No expired generations found");
      }
    } catch (error) {
      logger.error(
        "[GENERATION-CLEANUP] Failed to cleanup generations:",
        error
      );
    }
  });

  logger.info(
    `[GENERATION-CLEANUP] Scheduled to run: ${env.GENERATION_CLEANUP_CRON}`
  );
};
