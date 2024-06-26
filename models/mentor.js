// Importing the Mongoose library.
const mongoose = require("mongoose");

// Creating a schema for the mentors collection.
const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  students: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    default: [],
  },
});

// Exporting the model.
module.exports = mongoose.model("Mentor", mentorSchema, "mentors");
