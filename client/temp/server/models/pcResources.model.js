const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PcResourcesSchema = new Schema({
  content: {
    type: String,
  },
  pdf1: {
    name: String,
    img: String,
    file: String,
  },
  pdf2: {
    name: String,
    img: String,
    file: String,
  },
  pdf3: {
    name: String,
    img: String,
    file: String,
  },
  pdf4: {
    name: String,
    img: String,
    file: String,
  },
  pdf5: {
    name: String,
    img: String,
    file: String,
  },
});

const PcResources = mongoose.model("pcResources", PcResourcesSchema);
module.exports = PcResources;
