const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  image: String,
  position: String,
  page: String,
});

const Image = mongoose.model("Image", ImageSchema);
module.exports = { Image };
