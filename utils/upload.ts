import multer, { type FileFilterCallback } from "multer";
import path from "path";
import { type Request } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const uploadFile = path.join(__dirname, "../uploads");
      console.log("Upload destination:", uploadFile);
      console.log("in multer ", file);
      if (!fs.existsSync(uploadFile)) {
        fs.mkdirSync(uploadFile, { recursive: true });
        console.log("Created uploads directory:", uploadFile);
      }
      cb(null, uploadFile);
    } catch (error) {
      console.error("Error creating upload directory:", error);
      cb(error as Error, "");
    }
  },
  filename: (req, file, cb) => {
    try {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const filename = uniqueSuffix + path.extname(file.originalname);
      console.log("Generated filename:", filename);
      cb(null, filename);
    } catch (error) {
      console.error("Error generating filename:", error);
      cb(error as Error, "");
    }
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  console.log("File filter - mimetype:", file.mimetype);
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Seules les images sont autorisées"));
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, 
};

const upload = multer({
  storage,
  fileFilter,
  limits,
});

export default upload;

