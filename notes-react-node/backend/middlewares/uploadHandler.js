import multer from "multer";
import basePathTo from "../utils/basePath.js";
import path from "node:path";
import { FileTypeError } from "../error/customError.js";

const publicDir = basePathTo("../public/images/users/");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, publicDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    filterFileTypes(req, file, cb);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
    files: 1,
  },
});

const filterFileTypes = (req, file, cb) => {
  const allowedMimeTypes = ["image/png", "image/jpeg"];
  const allowedExt = [".png", ".jpg", ".jpeg"];
  const fileExt = path.extname(file.originalname).toLowerCase();

  if (
    allowedMimeTypes.includes(file.mimetype) &&
    allowedExt.includes(fileExt)
  ) {
    cb(null, true);
  } else {
    cb(new FileTypeError("Only png | jpg | jpeg format allowed!"));
  }
};

export default upload;
