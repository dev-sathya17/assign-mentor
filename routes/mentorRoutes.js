const express = require("express");
const mentorController = require("../controllers/mentorController");

const mentorRouter = express.Router();

mentorRouter.post("/", mentorController.register);

module.exports = mentorRouter;
