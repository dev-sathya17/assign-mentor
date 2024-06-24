const mongoose = require("mongoose");
const { MONGODB_URI, PORT } = require("./utils/config");
const app = require("./app");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log("Server is running on port:", PORT);
    });
  })
  .catch((error) => {
    console.log("An error occurred while connecting to database", error);
  });
