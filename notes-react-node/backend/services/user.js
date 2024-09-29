import * as db from "../databases/user.js";
import { DatabaseError } from "../error/customError.js";

export const getUsers = async () => {
  return await db.getAllUser();
};

export const getUser = async (id) => {
  const user = await db.getUserById(id);
  if (!user) {
    throw new DatabaseError("User not found", 404);
  }
  return user;
};

export const getUserByUsername = async (username) => {
  return await db.getUserByUsername(username);
};

export const createUser = async (username, email, password) => {
  return await db.createUser(username, email, password);
};

export const updateUser = async (id, username, email, password) => {
  const user = await db.updateUser(id, username, email, password);
  if (!user) {
    throw new DatabaseError("User not found", 404);
  }
  return user;
};

export const deleteUser = async (id) => {
  const user = await db.deleteUser(id);
  if (!user) {
    throw new DatabaseError("User not found", 404);
  }
  return user;
};
