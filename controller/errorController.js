const AppError = require("../utils/appError");

const sendErrorDev = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message;

  return res.status(statusCode).json({
    status: status,
    message: message,
  });
};

const sendErrorProd = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message;

  if (err.isOperational) {
    return res.status(statusCode).json({
      status: status,
      message: message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went wrong...",
  });
};

const globalErrorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.name === "JsonWebTokenError") {
    err = new AppError(err.message, 401);
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    err = new AppError(err.errors[0].message, 400);
  }
  if (err.name === "SequelizeValidationError") {
    err = new AppError(err.errors[0].message, 400);
  }
  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(err, res);
  }
  sendErrorProd(err, res);
};

module.exports = globalErrorHandler;
