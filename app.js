require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");

const app = express();
const PORT = process.env.APP_PORT || 3000;

const authRouter = require("./route/authRoute");
const projectRouter = require("./route/projectRoute");

// Parse json body
app.use(express.json());

// All Routes are here
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/project", projectRouter);

// fallback route
app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server up and running`);
});
