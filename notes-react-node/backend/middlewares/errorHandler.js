import {
  ConflictError,
  DatabaseError,
  NotFoundError,
  UnauthorizedError,
} from "../error/customError.js";

const globalErrorHandler = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV === "dev";

  if (
    err instanceof UnauthorizedError ||
    err instanceof NotFoundError ||
    err instanceof ConflictError
  ) {
    res.status(err.status).json({ message: err.message });
  } else if (err instanceof DatabaseError) {
    const message = isDev ? err.message : err.type;
    res.status(err.status).json({ message });
  } else {
    res.status(500).json({ message: "AAAAAAAAAAHHHHH" });
  }
};

export default globalErrorHandler;
