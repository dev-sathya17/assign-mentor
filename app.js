const express = require("express");
const studentRouter = require("./routes/studentRoutes");
const mentorRouter = require("./routes/mentorRoutes");

const app = express();

app.use(express.json());

app.use("/students", studentRouter);
app.use("/mentors", mentorRouter);

module.exports = app;
