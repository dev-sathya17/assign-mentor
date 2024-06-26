// Importing dotenv to use environment variables
require("dotenv").config();

// Getting environment variables from .env file
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.SERVER_PORT;

// Exporting variables.
module.exports = {
  MONGODB_URI,
  PORT,
};
