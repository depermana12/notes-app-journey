import * as db from "../db/userQueries.js";
import { createJWT, hashPassword } from "../modules/auth.js";

export const getAllUser = async (req, res) => {
  const users = await db.getAllUser();

  res.status(200);
  res.json({ message: "success", name: users[0].username });
};
export const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await db.getUserById(id);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  const updatedUser = await db.updateUser(id, username, email, password);
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const deletedUser = await db.deleteUser(id);
};
