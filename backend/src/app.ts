import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import allRoutes from "./routes";

const app = express();

app.use(express.json());

// Routes
app.use("/api/v1", allRoutes);
// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
