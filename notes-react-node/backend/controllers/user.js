import * as userService from "../services/user.js";
import { body, validationResult } from "express-validator";
import { hashPassword, createJWT } from "../auth/authUtils.js";
import { NotFoundError, ConflictError } from "../error/customError.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const getAllUser = asyncHandler(async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json({ message: "success", data: users });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUser(req.params.id);
  res.status(200).json({ message: "success", data: user });
});

export const getUserByUsername = asyncHandler(async (req, res) => {
  const user = await userService.getUserByUsername(req.body.username);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  res.status(200).json({ message: "success", data: user });
});

export const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  await Promise.all([
    body("username").notEmpty().withMessage("Username is required").run(req),
    body("email").notEmpty().isEmail().withMessage("Invalid email").run(req),
    body("password")
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters")
      .run(req),
  ]);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ message: "error", errors: errors.array() });
    return;
  }

  const existingUser = await userService.getUserByUsername(username);

  if (existingUser) {
    throw new ConflictError("Username already exists");
  }

  const hashedPassword = await hashPassword(password);
  const newUser = await userService.createUser(username, email, hashedPassword);
  const token = createJWT(newUser);
  res.status(201).json({ message: "successfully created", data: { token } });
});

export const updateUser = asyncHandler(async (req, res) => {
  const upadatedUser = await userService.updateUser(
    req.params.id,
    req.body.username,
    req.body.email,
    req.body.password,
  );
  res.status(200).json({ message: "success", data: upadatedUser });
});

export const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).json({ message: "success" });
});
