const Mentor = require("../models/mentor");
const Student = require("../models/student");

const mentorController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const isExistingMentor = await Mentor.findOne({ email });
      if (isExistingMentor) {
        return res.status(400).json({ message: "Mentor already exists" });
      }

      const mentor = new Mentor({ name, email, password });
      await mentor.save();
      res.status(201).json({ message: "Mentor registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  addStudent: async (req, res) => {
    try {
      const { id } = req.params;
      const { studentId } = req.body;
      const mentor = await Mentor.findById(id);
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }

      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      const updatedMentor = await Mentor.findByIdAndUpdate(id, {
        $addToSet: { students: studentId },
      });

      if (updatedMentor) {
        await student.updateOne({ currentMentor: id });
        res.status(200).json({
          message: `Student, ${student.name} assigned to mentor ${mentor.name} successfully`,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getStudents: async (req, res) => {
    try {
      const { id } = req.params;
      const mentor = await Mentor.findById(id);
      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }
      const students = await Mentor.find(
        { _id: id },
        { students: 1, _id: 0, name: 1 }
      ).populate("students", "name email");

      res.status(200).json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = mentorController;
