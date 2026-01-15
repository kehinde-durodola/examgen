import dotenv from "dotenv";

// Only load .env file if it exists (not in Docker where env vars are passed directly)
dotenv.config();

const requiredEnvVars = [
  "DATABASE_URL",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
  "OPENAI_API_KEY",
  "ALLOWED_ORIGINS",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
  PORT: parseInt(process.env.PORT || "3000", 10),
  NODE_ENV: process.env.NODE_ENV || "development",
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS!,
  DAILY_TOKEN_LIMIT: parseInt(process.env.DAILY_TOKEN_LIMIT || "3", 10),
  TOKEN_REFRESH_CRON: process.env.TOKEN_REFRESH_CRON || "0 0 * * *",
  GENERATION_CLEANUP_CRON: process.env.GENERATION_CLEANUP_CRON || "0 * * * *",
  CRON_SECRET: process.env.CRON_SECRET,
};
