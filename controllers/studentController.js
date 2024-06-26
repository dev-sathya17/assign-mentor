const Mentor = require("../models/mentor");
const Student = require("../models/student");

const studentController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const isExistingStudent = await Student.findOne({ email });
      if (isExistingStudent) {
        return res.status(400).json({ message: "Student already exists" });
      }

      const student = new Student({ name, email, password });
      await student.save();
      res.status(201).json({ message: "Student registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getUnassignedStudents: async (req, res) => {
    try {
      const students = await Student.find({ currentMentor: null });
      res.status(200).json(students);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  changeMentor: async (req, res) => {
    try {
      const { id } = req.params;
      const { mentorId } = req.body;
      const student = await Student.findById(id);
      const previousMentor = student.currentMentor;
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      const mentor = await Mentor.findById(mentorId);

      if (!mentor) {
        return res.status(404).json({ message: "Mentor not found" });
      }

      const updatedPreviousMentor = await Mentor.findById(previousMentor);
      if (updatedPreviousMentor) {
        await updatedPreviousMentor.updateOne({
          $pull: { students: id },
        });
      }

      const updatedStudent = await Student.findByIdAndUpdate(id, {
        currentMentor: mentorId,
        previousMentors: [...student.previousMentors, previousMentor],
      });

      if (updatedStudent) {
        const mentor = await Mentor.findById(mentorId);
        if (mentor) {
          await mentor.updateOne({ $addToSet: { students: id } });
        }
        res.status(200).json({
          message: `Student, ${student.name} assigned to mentor ${mentor.name} successfully`,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = studentController;
