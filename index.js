// Importing mongoose package to connect with the database
const mongoose = require("mongoose");

// Importing Environment variables from config file
const { MONGODB_URI, PORT } = require("./utils/config");

// Importing express app from app.js
const app = require("./app");

// Connecting to database
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Database connected");
    // Starting server on PORT
    app.listen(PORT, () => {
      console.log("Server is running on port:", PORT);
    });
  })
  .catch((error) => {
    console.log("An error occurred while connecting to database", error);
  });
