import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/database.js";
import { logger } from "./utils/logger.util.js";

const startServer = async () => {
  try {
    await prisma.$connect();
    logger.info("Database connected successfully");

    const PORT = env.PORT;

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      logger.info(`Environment: ${env.NODE_ENV}`);
      logger.info(`Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

process.on("SIGTERM", async () => {
  logger.info("SIGTERM received, shutting down gracefully...");
  await prisma.$disconnect();
  logger.info("Database disconnected");
  process.exit(0);
});

process.on("SIGINT", async () => {
  logger.info("SIGINT received, shutting down gracefully...");
  await prisma.$disconnect();
  logger.info("Database disconnected");
  process.exit(0);
});

process.on("unhandledRejection", (error) => {
  logger.error("Unhandled rejection:", error);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught exception:", error);
  process.exit(1);
});

startServer();
