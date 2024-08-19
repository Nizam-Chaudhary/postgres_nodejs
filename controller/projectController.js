const project = require("../db/models/project");
const { Sequelize, where } = require("sequelize");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const user = require("../db/models/user")

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
  const userId = req.user.id;
  const allProjects = await project.findAll({where: {createdBy: userId},include: user});
  if (!allProjects) {
    throw new AppError("error getting all projects", 400);
  }
  return res.status(200).json({
    status: "success",
    data: allProjects,
  });
});

const getProjectById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const allProjects = await project.findByPk(id,{include: user});
  if (!allProjects) {
    throw new AppError("Invalid project id", 400);
  }
  return res.status(201).json({
    status: "success",
    data: allProjects,
  });
});

const udpateProject = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.params.id;
  const body = req.body;
  const result = await project.findOne({where:{id: projectId, createdBy: userId}});
  if (!result) {
    throw new AppError("Invalid project id", 400);
  }
  result.title = body.title || result.title;
  result.productImage = body.productImage || result.productImage;
  result.price = body.price || result.price;
  result.shortDescription = body.shortDescription || result.shortDescription;
  result.description = body.description || result.description;
  result.productUrl = body.productUrl || result.productUrl;
  result.category = body.category || result.category;
  result.tags = body.tags || result.tags;

  await result.save();

  return res.status(201).json({
    status: "success",
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.params.id;
  const body = req.body;
  const result = await project.destroy({where:{id: projectId, createdBy: userId}});

  return res.status(201).json({
    status: "success",
    data: "project removed successfully",
  });
});

module.exports = { createProject, getAllProject, getProjectById, udpateProject, deleteProject };
