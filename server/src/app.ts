import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { env } from "./config/env.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.ALLOWED_ORIGINS.split(","),
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, error: { message: "Route not found" } });
});

app.use(errorHandler);

export default app;
