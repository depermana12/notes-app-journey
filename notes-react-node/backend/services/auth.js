import * as db from "../database/user.js";
import { DatabaseError } from "../error/customError.js";

export const updateUserPassword = async (user, password) => {
  const result = await db.updatePassword(user.user_id, password);
  if (result === 0) {
    throw new DatabaseError("Failed to update password");
  } else {
    return true;
  }
};
