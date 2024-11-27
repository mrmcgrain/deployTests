const path = require("path");
const fs = require("fs");
const { Image } = require("../models/image.model");
const { SlideShow } = require("../models/slideShow.model");

module.exports = {
  uploadImg: (req, res) => {
    if (req.files) {
      let image = req.files.images;
      image.name = image.name.replace(/\s/g, "");
      image.mv(
        path.resolve(process.cwd() + "/public/images/slideshow/", image.name),
        async (err) => {
          if (err) {
            return res.status(500).send(err);
          }
        }
      );
      Image.create({
        ...req.body,
        image: `/public/images/slideshow/` + image.name,
        page: "home",
      });
      Image.find({ page: "home" }).then((slides) => {
        res.json({ msg: "Image Uploaded successfully", slide: slides });
      });
    }
  },
  deleteImg: (req, res) => {
    Image.findByIdAndDelete(req.params.id)
      .then((deleted) => {
        Image.find({ page: "home" })
          .populate("image")
          .then((slides) => {
            res.json({ msg: "Image deleted successfully", slide: slides });
          });
      })
      .catch((err) => console.log("err", err));
  },

  updateImg: (req, res) => {
    Image.findById(req.params.id).then((found) => {
      if (req.files) {
        let image = req.files.images;
        image.name = image.name.replace(/\s/g, "");
        image.mv(
          path.resolve(process.cwd() + "/public/images/slideshow/", image.name),
          async (err) => {
            if (err) {
              return res.status(500).send(err);
            }
          }
        );
        found.image = `/public/images/slideshow/` + image.name;
        found.save();
        Image.find({ page: "home" })
          .populate("image")
          .then((slides) => {
            res.json({ msg: "Image Updated successfully", slide: slides });
          });
      }
    });
  },
};
