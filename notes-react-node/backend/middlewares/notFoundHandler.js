import { NotFoundError } from "../error/customError.js";

export const invalidRouteHandler = (req, res, next) => {
  next(new NotFoundError(`Invalid route: ${req.originalUrl}`));
};

export default invalidRouteHandler;
