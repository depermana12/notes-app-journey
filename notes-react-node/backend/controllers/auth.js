import * as userService from "../services/user.js";
import * as authService from "../services/auth.js";
import { body, validationResult } from "express-validator";
import { UnauthorizedError, NotFoundError } from "../error/customError.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  sendResetPasswordEmail,
  createJWT,
  verifyJwt,
  hashPassword,
  comparePassword,
} from "../auth/authUtils.js";

export const signIn = asyncHandler(async (req, res) => {
  await Promise.all([
    body("username").notEmpty().withMessage("Username is required").run(req),
    body("password").notEmpty().withMessage("Password is required").run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ message: "error", errors: errors.array() });
    return;
  }

  const { username, password } = req.body;
  const user = await userService.getUserByUsername(username);

  if (!user || !(await comparePassword(password, user.password))) {
    throw new UnauthorizedError("Invalid username or password");
  }

  const token = createJWT(user);
  res.status(200).json({ message: "success", data: { token } });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const userEmail = await userService.getUserByEmail(req.body.email);

  if (!userEmail) {
    throw new NotFoundError("Email not found");
  }

  const token = createJWT(userEmail, { expiresIn: "5m" });
  await sendResetPasswordEmail(userEmail, token);

  res.status(200).json({ message: "Email reset password sent" });
});

export const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const user = await userService.getUser(id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const userPayload = verifyJwt(token);

  if (userPayload.id !== user.user_id) {
    throw new UnauthorizedError("Invalid user not matched");
  }

  const hashedPassword = await hashPassword(password);
  await authService.updateUserPassword(user, hashedPassword);

  res.status(200).json({ message: "Password updated" });
};
