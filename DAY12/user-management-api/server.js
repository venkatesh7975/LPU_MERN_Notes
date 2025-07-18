require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const authMiddleware = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/users");
const logger = require("./utils/logger");

const app = express();

// Read config file (File System usage)
const configPath = path.join(__dirname, "config", "appConfig.json");
const configData = JSON.parse(fs.readFileSync(configPath, "utf-8"));
logger.log(`Starting ${configData.appName} v${configData.version}`);

// Middleware
app.use(express.json());

// Serve static files from public (if you have any)
app.use(express.static("public"));

// Basic route
app.get("/", (req, res) => {
  res.send("Welcome to User Management API");
});

// Secure user routes with token auth middleware
app.use("/users", authMiddleware, userRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    logger.log("Connected to MongoDB");
    app.listen(process.env.PORT || 5000, () => {
      logger.log(`Server started on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    logger.log("Failed to connect to MongoDB");
    console.error(err);
  });
