const catchAsync = require("../utils/catchAsync");
const user = require("../db/models/user");
const AppError = require("../utils/appError");
const { Sequelize } = require("sequelize");

const getAllUser = catchAsync(async (req, res, next) => {
  const result = await user.findAll({
    attributes: {
      attributes: {
        exclude: ["password"],
      },
    },
    where: {
      userType: { [Sequelize.Op.ne]: "0" },
    },
  });

  if (!result) {
    throw new AppError("Error getting users", 400);
  }

  res.status(200).json({
    status: "success",
    data: result,
  });
});

module.exports = getAllUser;
