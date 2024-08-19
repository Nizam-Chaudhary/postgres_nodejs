require("dotenv").config({ path: `${process.cwd()}/.env` });

const user = require("../db/models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const signUp = catchAsync(async (req, res, next) => {
  const body = req.body;

  if (!["1", "2"].includes(body.userType)) {
    return next(new AppError("Invalid User Type", 400));
  }

  const newUser = await user.create({
    userType: body.userType,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email.toLowerCase(),
    password: body.password,
    confirmPassword: body.confirmPassword,
  });

  const result = newUser.toJSON();
  if (!result) {
    return next(new AppError("Failed to create user", 400));
  }

  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({
    id: result.id,
  });

  return res.status(201).json({
    status: "success",
    data: result,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("please provide email and password", 400));
  }

  const result = await user.findOne({
    where: { email: email.toLowerCase() },
  });
  if (!result || !(await bcrypt.compare(password, result.password))) {
    return next(new AppError("incorrect email or password", 401));
  }

  const token = generateToken({
    id: result.id,
  });

  return res.status(201).json({
    status: "success",
    data: token,
  });
});

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = { signUp, login };
