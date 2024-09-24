import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";

export const createJWT = (user) => {
  // TODO add expiresIn maybe?
  const token = jwt.sign(
    // the id schema in db is user_id because i want to try natural join, it should be just id
    { id: user.user_id, username: user.username },
    process.env.JWT_SECRET,
  );

  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "Unauthorized" });
    return;
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "Unauthorized" });
    return;
  }

  try {
    const userPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userPayload;
    next();
  } catch (error) {
    console.error(error);
    res.status(401);
    res.json({ message: "Invalid token" });
    return;
  }
};

export const comparePassword = (password, hash) => {
  return bycrypt.compare(password, hash);
};

export const hashPassword = (password) => {
  return bycrypt.hash(password, 8);
};
