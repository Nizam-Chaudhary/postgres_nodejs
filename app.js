require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");

const app = express();
const PORT = process.env.APP_PORT || 3000;

const authRouter = require("./route/authRoute");

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Working",
  });
});

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server up and running`);
});
