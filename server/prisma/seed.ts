import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed...");

  const existingUser = await prisma.user.findUnique({
    where: { email: "test@example.com" },
  });

  if (existingUser) {
    console.log("Test user already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("test123", 10);

  const user = await prisma.user.create({
    data: {
      email: "test@examgen.com",
      password: hashedPassword,
      name: "Test User",
      tokensRemaining: 3,
    },
  });

  console.log("Test user created:");
  console.log("Email: test@example.com");
  console.log("Password: test123");
  console.log("Seed complete");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
