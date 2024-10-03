import { UnauthorizedError } from "../error/customError.js";
import { verifyJwt } from "./authUtils.js";

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    throw new UnauthorizedError("Unauthorized to access this route");
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    throw new UnauthorizedError("Unauthorized token");
  }

  try {
    const userPayload = verifyJwt(token);
    req.user = userPayload;
    console.log(req.user);
    next();
  } catch (error) {
    console.error(error);
    return next(new UnauthorizedError("elahhh token lu error"));
  }
};
