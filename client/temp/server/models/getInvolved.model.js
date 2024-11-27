const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GetInvolvedSchema = new Schema({
  content: String,
  pdf: String,
  contactUsContent: String,
});

const GetInvolved = mongoose.model("GetInvolved", GetInvolvedSchema);
module.exports = GetInvolved;

