import status from "http-status";
import Exception from "../errors/Exception.js";

const ErrorMiddleware = (error, req, res, next) => {
  let statusCode = 500;
  let errors = [];
  let description = "internal server error";
  let title = "INTERNAL_SERVER_ERROR";
  if (error instanceof Exception) {
    statusCode = error.statusCode;
    errors = error.errors;
    description = error.description;
    title = error.name;
  }

  res.status(statusCode).json({
    timestamp: new Date().getTime(),
    title,
    status: statusCode,
    code: status[statusCode],
    errors,
    description,
    path: req.path,
  });
  return next();
};

export default ErrorMiddleware;
