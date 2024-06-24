const mongoose = require("mongoose");
const { MONGODB_URI } = require("./utils/config");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Database connected ");
  })
  .catch((error) => {
    console.log("An error occurred while connecting to database", error);
  });
