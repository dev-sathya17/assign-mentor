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
};

module.exports = studentController;
