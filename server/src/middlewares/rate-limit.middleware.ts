import rateLimit from "express-rate-limit";

export const registrationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: {
      message:
        "Too many accounts created from this IP. Please try again in an hour.",
      code: "RATE_LIMIT_EXCEEDED",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
});

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    error: {
      message: "Too many login attempts. Please try again in 15 minutes.",
      code: "RATE_LIMIT_EXCEEDED",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
});

export const generationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    error: {
      message: "Too many generation requests. Please try again in an hour.",
      code: "RATE_LIMIT_EXCEEDED",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
});

export const authenticatedLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    error: {
      message: "Too many requests. Please try again in an hour.",
      code: "RATE_LIMIT_EXCEEDED",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
});

export const globalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  message: {
    success: false,
    error: {
      message: "Too many requests from this IP. Please try again later.",
      code: "RATE_LIMIT_EXCEEDED",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});
