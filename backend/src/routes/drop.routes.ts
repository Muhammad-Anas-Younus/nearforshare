import express from "express";
import { createDrop, getNearbyDrops } from "../controllers/drop.controller";

const router = express.Router();

router.post("/create", createDrop);
router.get("/nearby", getNearbyDrops);

export default router;
