// Importing the express library.
const express = require("express");

// Importing the controller object.
const mentorController = require("../controllers/mentorController");

// Creating a router.
const mentorRouter = express.Router();

// Route to add a mentor.
mentorRouter.post("/", mentorController.register);

// Route to add a student to the mentor.
mentorRouter.post("/:id/add", mentorController.addStudent);

// Route to get all students of the mentor.
mentorRouter.get("/:id/students", mentorController.getStudents);

// Exporting the router.
module.exports = mentorRouter;
