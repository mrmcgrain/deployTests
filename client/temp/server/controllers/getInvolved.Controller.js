const GetInvolved = require("../models/getInvolved.model");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

module.exports = {
  updateContent: (req, res) => {
    GetInvolved.findOne()
      .then((found) => {
        found.content = req.body.content;
        found.save();
        res.json({ msg: "Content updated successfully" });
      })
      .catch((err) => console.log("err", err));
  },
  updatePdf: (req, res) => {
    if (req.files) {
      let image = req.files.images;
      image.name = image.name.replace(/\s/g, "");
      image.mv(
        path.resolve(process.cwd() + `/public/images/getInvolved/`, image.name),
        async (err) => {
          if (err) {
            return res.status(500).send(err);
          }
        }
      );
      GetInvolved.findOne().then((found) => {
        found.pdf = `/public/images/getInvolved/${image.name}`;
        found.save();
        res.json({ msg: "PDF updated successfully" });
      });
    }
  },
  updateContactContent: (req, res) => {
    GetInvolved.findOne().then((found) => {
      found.contactUsContent = req.body.content;
      found.save();
      res.json({ msg: "Content updated successfully" });
    });
  },
};
