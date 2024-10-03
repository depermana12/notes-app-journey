import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import { UnauthorizedError } from "../error/customError.js";
import sendToEmail from "../utils/email.js";

export const createJWT = (user, option = {}) => {
  const token = jwt.sign(
    // the id in schema is user_id because i want to try natural join, it should be just id
    { id: user.user_id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: option.expiresIn || "7d" },
  );

  return token;
};

export const verifyJwt = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError(
        "Token expired, please request reset password again",
      );
    } else {
      throw new UnauthorizedError("Invalid token");
    }
  }
};

export const comparePassword = (password, hash) => {
  return bycrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bycrypt.hash(password, 8);
};

export const sendResetPasswordEmail = async (user, token) => {
  const link = `http://localhost:3000/api/v1/auth/reset-password/${user.user_id}/${token}`;

  const emailContent = {
    to: user.email,
    subject: "Reset Password",
    text: `Copy this link to reset your password: ${link}`,
  };

  try {
    await sendToEmail(emailContent);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send reset password email");
  }
};
