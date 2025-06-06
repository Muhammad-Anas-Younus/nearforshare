import express from "express";
import dropsRoutes from "./drop.routes";
import uploadRoutes from "./upload.routes";

const router = express.Router();

router.use("/drops", dropsRoutes);
router.use("/files", uploadRoutes);

export default router;
