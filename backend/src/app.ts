import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import allRoutes from "./routes";
import mongoose from "mongoose";
import config from "./config/config";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", allRoutes);
// Global error handler (should be after routes)
app.use(errorHandler);

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

export default app;
