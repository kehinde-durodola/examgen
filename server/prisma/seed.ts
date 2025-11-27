import { findByEmail, create } from "../src/repositories/user.repository.js";
import { hashPassword } from "../src/utils/password.util.js";
import { logger } from "../src/utils/logger.util.js";

async function main() {
  logger.info("Starting database seed...");

  const existingUser = await findByEmail("test@example.com");

  if (existingUser) {
    logger.info("Test user already exists");
    return;
  }

  const hashedPassword = await hashPassword("test123");

  const user = await create({
    email: "test@example.com",
    password: hashedPassword,
    name: "Test User",
  });

  logger.info("Test user created:", {
    email: user.email,
    password: "test123",
  });
  logger.info("Seed complete");
}

main().catch((e) => {
  logger.error("Seed failed:", e);
  process.exit(1);
});
