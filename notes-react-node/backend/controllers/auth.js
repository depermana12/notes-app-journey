import * as userService from "../services/user.js";
import { comparePassword, createJWT } from "../auth/auth.js";
import { body, validationResult } from "express-validator";
import { UnauthorizedError } from "../error/customError.js";
import asyncHandler from "../middlewares/asyncHandler.js";

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
