import { prisma } from "../src/config/database.js";
import { hashPassword } from "../src/utils/password.util.js";
import { logger } from "../src/utils/logger.util.js";

async function main() {
  logger.info("Starting database seed...");

  const existingUser = await prisma.user.findUnique({
    where: { email: "test@examgen.com" },
  });

  if (existingUser) {
    logger.info("Test user already exists");
    return;
  }

  const hashedPassword = await hashPassword("test123");

  const user = await prisma.user.create({
    data: {
      email: "test@examgen.com",
      password: hashedPassword,
      name: "Test User",
      tokensRemaining: 3,
    },
  });

  logger.info("Test user created:", {
    email: user.email,
    password: "test123",
  });
  logger.info("Seed complete");
}

main()
  .catch((e) => {
    logger.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
