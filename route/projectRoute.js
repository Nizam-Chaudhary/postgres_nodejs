const router = require("express").Router();
const {
  createProject,
  getAllProject,
  getProjectById,
  udpateProject,
  deleteProject,
} = require("../controller/projectController");
const { authenticate, restrictTo } = require("../controller/authController");

router
  .route("/")
  .get(authenticate, getAllProject)
  .post(authenticate, restrictTo("1"), createProject)

router
  .route("/:id")
  .get(authenticate, getProjectById)
  .patch(authenticate, udpateProject)
  .delete(authenticate, deleteProject)

module.exports = router;
