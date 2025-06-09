import multer from "multer";

const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  limits: { fieldSize: 10 * 1024 * 1024 }, //10MB
});

export default upload;
