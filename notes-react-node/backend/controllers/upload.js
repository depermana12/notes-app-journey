import upload from "../middlewares/uploadHandler.js";
import { handleUploadAvatar } from "../services/upload.js";

export const uploadAvatar = async (req, res) => {
  upload.single("avatar")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    try {
      const result = await handleUploadAvatar(req.file, req.user.id);
      return res
        .status(200)
        .json({ message: "Upload successful", data: result });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  });
};
