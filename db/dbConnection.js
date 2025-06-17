const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

connectToDatabase = async () => {
  if (!mongoURI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }
  try {
    await mongoose
    .connect(`${mongoURI}/Ezimax`, {
      useNewUrlParser: true,
      serverSelectionTimeoutMS: 10000,
    })
    .then(() => {
      console.log("DB is connected successfully");
    })
  } catch (err) {
    console.log("Error encounterd while connecting to Database", err.message);
      process.exit(1);
  }
};

module.exports = connectToDatabase;
