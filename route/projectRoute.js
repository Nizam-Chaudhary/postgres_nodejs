const router = require("express").Router();
const {
  createProject,
  getAllProject,
} = require("../controller/projectController");
const { authenticate, restrictTo } = require("../controller/authController");

router
  .route("/")
  .get(authenticate, getAllProject)
  .post(authenticate, restrictTo("1"), createProject);

module.exports = router;
