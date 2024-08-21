require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");

const app = express();
const PORT = process.env.APP_PORT || 3000;

const authRouter = require("./route/authRoute");
const projectRouter = require("./route/projectRoute");
const userRouter = require("./route/userRoute");
const globalErrorHandler = require("./controller/errorController");

// Parse json body
app.use(express.json());

// All Routes are here
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/user", userRouter);

// fallback route
app.use(
  "*",
  catchAsync(async (req, res, next) => {
    throw new AppError("Resource Not Found", 404);
  })
);

// Global Error Handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server up and running`);
});
