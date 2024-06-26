const Mentor = require("../models/mentor");

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
};

module.exports = mentorController;
