// Importing express library
const express = require("express");

// Importing routers from routes file.
const studentRouter = require("./routes/studentRoutes");
const mentorRouter = require("./routes/mentorRoutes");

// Creating an express app.
const app = express();

// Creating a middleware to parse request body.
app.use(express.json());

// Using routes as a middleware.
app.use("/students", studentRouter);
app.use("/mentors", mentorRouter);

// Exporting the express application
module.exports = app;
