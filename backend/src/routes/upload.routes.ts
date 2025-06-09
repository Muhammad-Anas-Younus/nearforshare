import express from "express";
import upload from "../utils/storage";
import { uploadFiles } from "../controllers/upload.controller";

const router = express.Router();

router.post("/upload", upload.array("files"), uploadFiles);

export default router;
