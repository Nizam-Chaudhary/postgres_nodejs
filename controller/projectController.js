const project = require("../db/models/project");
const { Sequelize } = require("sequelize");

const createProject = async (req, res, next) => {
  try {
    const body = req.body;

    const newProject = await project.create({
      title: body.title,
      productImage: body.productImage,
      price: body.price,
      shortDescription: body.shortDescription,
      description: body.description,
      productUrl: body.productUrl,
      category: body.category,
      tags: body.tags,
      createdBy: 1,
    });

    const result = newProject.toJSON();

    if (!result) {
      return res.status(400).json({
        status: "fail",
        message: "Error Creating Project",
      });
    }

    delete result.updatedAt;
    delete result.createdAt;
    delete result.deletedAt;

    return res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Sequelize.ValidationError) {
      const messages = error.errors.map((errItem) => errItem.message);
      return res.status(400).json({
        status: "fail",
        message: messages,
      });
    }

    return res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

module.exports = { createProject };
