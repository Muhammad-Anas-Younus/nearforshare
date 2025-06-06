import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
});

const upload = multer({ storage });

export default upload;
