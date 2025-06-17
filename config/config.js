const dotenv = require("dontenv");
dotenv.config();

const environmentVariables = {
  mongoURI: process.env.MONGO_URI,
  port: process.env.PORT,
};

module.exports = environmentVariables;
