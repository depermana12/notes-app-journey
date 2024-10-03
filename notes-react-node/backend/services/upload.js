import * as db from "../database/upload.js";

export const handleUploadAvatar = async (file, userId) => {
  const avatar = await db.insertAvatar(file.filename, userId);
  return avatar;
};
