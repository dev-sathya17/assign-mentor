const express = require("express");
const studentRouter = require("./routes/studentRoutes");

const app = express();

app.use(express.json());

app.use("/students", studentRouter);

module.exports = app;
