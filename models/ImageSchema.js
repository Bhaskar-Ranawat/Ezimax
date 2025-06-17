const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  fileName: { type: String },
  fileType: { type: String },
});

// Create and export the model
const Image = mongoose.model('Image', imageSchema);
module.exports = Image;
