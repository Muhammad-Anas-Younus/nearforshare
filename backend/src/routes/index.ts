import express from "express";
import dropsRoutes from "./drop.routes";

const router = express.Router();

router.use("/drops", dropsRoutes);

export default router;
