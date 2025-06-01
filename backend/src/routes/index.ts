import express from "express";
import dropsRoutes from "./drops";

const router = express.Router();

router.use("/drops", dropsRoutes);

export default router;
