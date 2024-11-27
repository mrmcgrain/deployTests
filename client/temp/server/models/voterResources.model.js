const mongoose = require("mongoose");

const VoterResources = new mongoose.Schema({
  content: {
    type: String,
  },
  first: {
    name: String,
    position: String,
    email: String,
    photo: String,
  },
  second: {
    name: String,
    position: String,
    email: String,
    photo: String,
  },
  third: {
    name: String,
    position: String,
    email: String,
    photo: String,
  },
  content2: {
    type: String,
    photo: String,
  },
  content3: {
    type: String,
    photo: String,
  },
  photo: {
    type: String,
  },
  link: {
    type: String,
  },
});

const Voter = mongoose.model("Voter", VoterResources);
module.exports = { Voter };
