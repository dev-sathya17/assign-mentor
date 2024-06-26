const express = require("express");
const mentorController = require("../controllers/mentorController");

const mentorRouter = express.Router();

mentorRouter.post("/", mentorController.register);
mentorRouter.post("/:id/add", mentorController.addStudent);

module.exports = mentorRouter;
