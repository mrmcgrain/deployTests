// const PcResources = require('../models/pcResources.model');
const mongoose = require("mongoose");
const { Image } = require("../models/image.model");
const PcResources = require("../models/pcResources.model");
const fs = require("fs");
const path = require("path");

module.exports = {
  updatePCImg: (req, res) => {
    if (req.files) {
      let image = req.files.images;
      image.name = image.name.replace(/\s/g, "");
      image.mv(
        path.resolve(
          process.cwd() + `/public/images/resources/${req.params.id}/`,
          image.name
        ),
        async (err) => {
          if (err) {
            return res.status(500).send(err);
          }
        }
      );
      PcResources.findOne().then((found) => {
        found[
          req.params.id
        ].img = `/public/images/resources/${req.params.id}/${image.name}`;
        found.save();
        res.json({ msg: "Image updated successfully" });
      });
    }
  },
  updateContent: (req, res) => {
    PcResources.findOne()
      .then((found) => {
        found.content = req.body.content;
        found.save();
        res.json({ msg: "Content updated successfully" });
      })
      .catch((err) => console.log("err", err));
  },
  updateName: (req, res) => {
    PcResources.findOne()
      .then((found) => {
        found[req.params.id].name = req.body[req.params.id];
        found.save();
        res.json({ msg: "Name updated successfully" });
      })
      .catch((err) => console.log("err", err));
  },
  updatePdf: (req, res) => {
    if (req.files) {
      let image = req.files.images;
      image.name = image.name.replace(/\s/g, "");
      image.mv(
        path.resolve(
          process.cwd() + `/public/images/resources/${req.params.id}/`,
          image.name
        ),
        async (err) => {
          if (err) {
            return res.status(500).send(err);
          }
        }
      );
      PcResources.findOne().then((found) => {
        found[
          req.params.id
        ].file = `/public/images/resources/${req.params.id}/${image.name}`;
        found.save();
        res.json({ msg: "PDF updated successfully" });
      });
    }
  },
};
