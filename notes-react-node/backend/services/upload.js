import * as db from "../databases/upload.js";

export const handleUploadAvatar = async (file, userId) => {
  const avatar = await db.insertAvatar(file.filename, userId);
  return avatar;
};
