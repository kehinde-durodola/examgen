import cron from "node-cron";
import { resetAllTokens } from "../repositories/user.repository.js";
import { logger } from "../utils/logger.util.js";
import { env } from "../config/env.js";

export const startTokenRefreshCron = () => {
  cron.schedule(env.TOKEN_REFRESH_CRON, async () => {
    try {
      logger.info("[TOKEN-REFRESH] Starting daily token refresh...");

      const result = await resetAllTokens();

      logger.info(
        `[TOKEN-REFRESH] Successfully refreshed tokens for ${result.count} users`
      );
    } catch (error) {
      logger.error("[TOKEN-REFRESH] Failed to refresh tokens:", error);
    }
  });

  logger.info(`[TOKEN-REFRESH] Scheduled to run: ${env.TOKEN_REFRESH_CRON}`);
};
