import logger from "../config/logger.js";

const globalErrorHandler = (err, req, res, next) => {
  const isDev = process.env.NODE_ENV === "dev";

  const errorMessage = isDev
    ? err.message
    : `Something went wrong: ${err.type}`;

  const stackTrace = isDev
    ? err.stack
    : "oh no, you don't get to see stack trace";

  logger.error(err.message, { stack: err.stack });

  // logger.info("This is an info log for testing.");

  res
    .status(err.status || 500)
    .json({ message: errorMessage, stack: stackTrace });
};

export default globalErrorHandler;
