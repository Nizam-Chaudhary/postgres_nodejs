const project = require("../db/models/project");
const { Sequelize } = require("sequelize");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createProject = catchAsync(async (req, res, next) => {
  const body = req.body;
  const userId = req.user.id;

  const newProject = await project.create({
    title: body.title,
    productImage: body.productImage,
    price: body.price,
    shortDescription: body.shortDescription,
    description: body.description,
    productUrl: body.productUrl,
    category: body.category,
    tags: body.tags,
    createdBy: userId,
  });

  const result = newProject.toJSON();

  if (!result) {
    return next(new AppError("Error Creating Project"), 400);
  }

  delete result.updatedAt;
  delete result.createdAt;
  delete result.deletedAt;

  return res.status(201).json({
    status: "success",
    data: result,
  });
});

const getAllProject = catchAsync(async (req, res, next) => {
  const allProjects = await project.findAll();
  if (!allProjects) {
    throw new AppError("Error get all projects", 400);
  }
  return res.status(201).json({
    status: "success",
    data: allProjects,
  });
});

module.exports = { createProject, getAllProject };
