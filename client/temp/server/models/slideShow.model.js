const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Image } = require("./image.model");

const SlideShowSchema = new Schema({
  img: { type: Schema.Types.ObjectId, ref: "Image" },
});

const SlideShow = mongoose.model("SlideShow", SlideShowSchema);
module.exports = { SlideShow };
