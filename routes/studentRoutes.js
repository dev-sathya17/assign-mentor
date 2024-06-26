// Importing express library.
const express = require("express");

// Importing the controller object.
const studentController = require("../controllers/studentController");

// Creating the router object.
const studentRouter = express.Router();

// Router to add a student.
studentRouter.post("/", studentController.register);

// Router to get all students who do not have any mentor assigned.
studentRouter.get("/unassigned", studentController.getUnassignedStudents);

// Router to change mentor for a given student.
studentRouter.post("/:id/change", studentController.changeMentor);

// Router to get all previous mentors of a given student.
studentRouter.get("/:id/previousMentors", studentController.getPreviousMentors);

// Exporting the router.
module.exports = studentRouter;
