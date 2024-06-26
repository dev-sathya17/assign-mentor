// Importing Schemas from Models
const Mentor = require("../models/mentor");
const Student = require("../models/student");

// Creating a controller for mentor operations.
const mentorController = {
  // API to add mentor.
  register: async (req, res) => {
    try {
      // Getting data from request body.
      const { name, email, password } = req.body;

      // Checking if mentor already exists.
      const isExistingMentor = await Mentor.findOne({ email });
      if (isExistingMentor) {
        return res.status(400).json({ message: "Mentor already exists" });
      }

      // Creating new mentor and saving it to the database.
      const mentor = new Mentor({ name, email, password });
      await mentor.save();

      // Sending a success response.
      res.status(201).json({ message: "Mentor registered successfully" });
    } catch (error) {
      // Sending an error response.
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // Adding a student to the mentor.
  addStudent: async (req, res) => {
    try {
      // Getting mentor id from query params.
      const { id } = req.params;

      // Getting student id from request body.
      const { studentId } = req.body;

      // Checking if such a mentor exists.
      const mentor = await Mentor.findById(id);
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }

      // Checking is students exists
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Checking if the student is already assigned to a mentor.
      if (!student.currentMentor) {
        // Adding student to the mentor.
        const updatedMentor = await Mentor.findByIdAndUpdate(id, {
          $addToSet: { students: studentId },
        });

        // Sending a success response if updated in database.
        if (updatedMentor) {
          await student.updateOne({ currentMentor: id });
          res.status(200).json({
            message: `Student, ${student.name} assigned to mentor ${mentor.name} successfully`,
          });
        }
      } else {
        return res
          .status(400)
          .json({ message: "Student already assigned to a mentor" });
      }
    } catch (error) {
      // Sending an error response.
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // API to get all students of a mentor.
  getStudents: async (req, res) => {
    try {
      // Getting mentor id from query params.
      const { id } = req.params;
      // Checking if such a mentor exists.
      const mentor = await Mentor.findById(id);
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }
      // Getting students of the mentor.
      const students = await Mentor.find(
        { _id: id },
        { students: 1, _id: 0, name: 1 }
      ).populate("students", "name email");

      // Sending the students as a response.
      res.status(200).json(students);
    } catch (error) {
      // Sending an error response.
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

// Exporting the controller
module.exports = mentorController;
