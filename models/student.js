// Importing Mongoose library.
const mongoose = require("mongoose");

// Creating a schema for the students collection.
const studentSchema = new mongoose.Schema({
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
  currentMentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Mentor",
    default: null,
  },
  previousMentors: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor",
      },
    ],
    default: [],
  },
});

// Exporting the model.
module.exports = mongoose.model("Student", studentSchema, "students");
