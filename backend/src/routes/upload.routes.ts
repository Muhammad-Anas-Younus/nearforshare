import express from "express";
import upload from "../utils/storage";
import { uploadFiles } from "../controllers/upload.controller";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadFiles);

export default router;
