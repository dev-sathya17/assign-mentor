const express = require("express");
const studentController = require("../controllers/studentController");
const studentRouter = express.Router();

studentRouter.post("/", studentController.register);
studentRouter.get("/unassigned", studentController.getUnassignedStudents);
studentRouter.post("/:id/change", studentController.changeMentor);

module.exports = studentRouter;
