const AboutModel = require("../models/about.model");
const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs");

const { Image } = require("../models/image.model");
const { User } = require("../models/user.model");
const About = require("../models/about.model");

const PcRersources = require("../models/pcResources.model");
const { Voter } = require("../models/voterResources.model");
const GetInvolved = require("../models/getInvolved.model");




module.exports = {
  getSite: (req, res) => {
    About.findOne()
      .populate("chairman.img")
      .populate("firstViceChair.img")
      .populate("secondViceChair.img")
      .populate("treasurer.img")
      .populate("secretary.img")
      .then((found) => {
        PcRersources.findOne()
          .populate("pdf1.img")
          .populate("pdf2.img")
          .populate("pdf3.img")
          .populate("pdf4.img")
          .populate("pdf5.img")
          .then((resources) => {
            Image.find({ page: "home" }).then((slides) => {
              Voter.findOne().then((voter) => {
                GetInvolved.findOne().then((getInvolved) => {
                  res.json({
                    about: found,
                    resources: resources,
                    slide: slides,
                    voter: voter,
                    getInvolved: getInvolved,
                  });
                });
              });
            });
          });
      })
      .catch((err) => console.log("err", err));
  },

  updateAbout: (req, res) => {
    const key = Object.keys(req.body);
    if (key[0] === "content") {
      About.findById(req.params.id).then((found) => {
        found[key] = req.body[key];
        found.save();
        res.json({ msg: "Content updated successfully" });
      });
    } else if (key[0] === "image") {
      let image = req.body.image;
      let newImage = new Image({
        image: {
          data: image.data,
          contentType: image.mimetype,
        },
      });
      newImage
        .save()
        .then((savedImage) => {
          About.findById(req.params.id).then((found) => {
            found[key].img = savedImage._id;
            found.save();
          });
        })
        .catch((err) => console.log("err", err));
    } else {
      About.findById(req.params.id).then((found) => {
        found[key].name = req.body[key];
        found.save();
      });
      res.json({ msg: "Name updated successfully" });
    }
  },
  updateImg: (req, res) => {
    if (req.files) {
      let image = req.files.images;
      image.name = image.name.replace(/\s/g, "");
      let newImage = new Image({
        ...req.body,
        image: `/public/images/about/${req.params.id}/` + image.name,
        page: "about",
      });
      image.mv(
        path.resolve(
          process.cwd() + `/public/images/about/${req.params.id}/`,
          image.name
        ),
        async (err) => {
          // save image to server folder
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
        }
      );
      newImage
        .save()
        .then((savedImage) => {
          // Find the About document
          About.findOne()
            .then((about) => {
              (about[req.params.id].img =
                `/public/images/about/${req.params.id}/` + image.name),
                about.save();
              res.json({ msg: "Image updated successfully" });
            })
            .catch((err) => console.log("err", err));
        })
        .catch((err) => console.log("err", err));
    }
  },
};
