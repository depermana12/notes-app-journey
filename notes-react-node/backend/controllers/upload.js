import upload from "../middlewares/uploadHandler.js";
import * as uploadService from "../services/upload.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { UploadError } from "../error/customError.js";

export const uploadAvatar = asyncHandler(async (req, res) => {
  const avatar = upload.single("avatar");

  avatar(req, res, async (err) => {
    if (err) throw new UploadError(err.message);

    if (!req.file)
      throw new UploadError("There is no file, please upload again");

    const result = await uploadService.handleUploadAvatar(
      req.file,
      req.user.id,
    );
    res.status(200).json({ message: "Upload successful", data: result });
  });
});
