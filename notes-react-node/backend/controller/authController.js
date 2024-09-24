import * as db from "../db/userQueries.js";
import { hashPassword, comparePassword, createJWT } from "../modules/auth.js";

export const signIn = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    res.json({ message: "Username and password required" });
    return;
  }

  const user = await db.getUserByUsername(username);

  if (!user) {
    res.status(404);
    res.json({ message: "User not found" });
    return;
  }

  const validPassword = await comparePassword(password, user.password);

  if (!validPassword) {
    res.status(401);
    res.json({ message: "Invalid password" });
    return;
  }

  const token = createJWT(user);

  res.status(200);
  res.json({ token });
};

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    res.json({ message: "Username, email, and password required" });
    return;
  }

  const existingUser = await db.getUserByUsername(username);

  if (existingUser) {
    res.status(409);
    res.json({ message: "Username already exists" });
    return;
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await db.createUser(username, email, hashedPassword);

  const token = createJWT(newUser);

  res.status(201);
  res.json({ token });
};
