const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Image } = require("./image.model"); // this is the image model

const AboutPageSchema = new Schema({
  content: {
    type: String,
  },
  chairman: {
    img: String,
    name: String,
  },
  firstViceChair: {
    img: String,
    name: String,
  },
  secondViceChair: {
    img: String,
    name: String,
  },
  treasurer: {
    img: String,
    name: String,
  },
  secretary: {
    img: String,
    name: String,
  },
});
const About = mongoose.model("About", AboutPageSchema);
module.exports = About;
