const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const routes = require("./routes");
const { errorHandler } = require("./middleware/error.middleware");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  })
);

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

app.use("/api", routes);
app.use(errorHandler);

module.exports = app;
