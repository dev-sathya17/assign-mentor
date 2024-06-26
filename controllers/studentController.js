// Importing schemas from Models
const Mentor = require("../models/mentor");
const Student = require("../models/student");

// Creating a controller to handle student operations
const studentController = {
  // Adding a student.
  register: async (req, res) => {
    try {
      // Getting data from request body.
      const { name, email, password } = req.body;

      // Checking if student already exists.
      const isExistingStudent = await Student.findOne({ email });
      if (isExistingStudent) {
        return res.status(400).json({ message: "Student already exists" });
      }

      // Creating new student and saving it to the database.
      const student = new Student({ name, email, password });
      await student.save();

      // Sending a success response.
      res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
      // Sending an error response.
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // Getting students who do not have any mentor assigned.
  getUnassignedStudents: async (req, res) => {
    try {
      // Finding students who do not have any mentor assigned.
      const students = await Student.find({ currentMentor: null });
      // Sending the students as a response.
      res.status(200).json(students);
    } catch (error) {
      // Sending an error response.
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // Changing mentor for a given student.
  changeMentor: async (req, res) => {
    try {
      // Getting student id from query params.
      const { id } = req.params;

      // Getting mentor id from request body.
      const { mentorId } = req.body;
      // Getting the student object to verify if such a user exists.
      const student = await Student.findById(id);

      // Checking if such a student exists.
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Getting the mentor value of the student.
      const previousMentor = student.currentMentor;

      // Checking if the mentor exists.
      const mentor = await Mentor.findById(mentorId);

      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }

      // Getting previous mentor's object.
      const updatedPreviousMentor = await Mentor.findById(previousMentor);

      // Updating the students of that mentor by removing the student.
      if (updatedPreviousMentor) {
        await updatedPreviousMentor.updateOne({
          $pull: { students: id },
        });
      }

      // Updating the student data, by changing their current mentor and appending to the previous mentors array.
      const updatedStudent = await Student.findByIdAndUpdate(id, {
        currentMentor: mentorId,
        previousMentors: [...student.previousMentors, previousMentor],
      });

      // If student is updated, update the new mentor's student array.
      if (updatedStudent) {
        const mentor = await Mentor.findById(mentorId);
        if (mentor) {
          await mentor.updateOne({ $addToSet: { students: id } });
        }

        // Sending a success response.
        res.status(200).json({
          message: `Student, ${student.name} assigned to mentor ${mentor.name} successfully`,
        });
      }
    } catch (error) {
      // Sending an error response.
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // Getting all the previous mentors of a given student.
  getPreviousMentors: async (req, res) => {
    try {
      // Getting student id from query params.
      const { id } = req.params;

      // Checking if such a student exists.
      const student = await Student.findById(id);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Getting previous mentors of the student.
      const previousMentors = await Student.find(
        { _id: id },
        { previousMentors: 1, name: 1, _id: 0 }
      ).populate("previousMentors", "name email");

      // Sending the previous mentors as a response.
      res.status(200).json(previousMentors);
    } catch (error) {
      // Sending an error response.
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = studentController;
