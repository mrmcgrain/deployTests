const fs = require("fs");
const path = require("path");
const { updateContent } = require("./pcResources.Controller");
const { Voter } = require("../models/voterResources.model");

module.exports = {
  updateContent: (req, res) => {
    let pos = Object.keys(req.body).toString();
    Voter.findOne().then((found) => {
      found[pos] = req.body[pos];
      found.save();
      res.json({ message: "Content Updated" });
    });
  },
  updateRep: (req, res) => {
    id = req.body.id;
    Voter.findOne().then((found) => {
      (found[id].name = req.body.name),
        (found[id].email = req.body.email),
        (found[id].position = req.body.position),
        (found[id].id = req.body.id);
      found.save();
    });
  },
  updateImg: (req, res) => {
    if (req.files) {
      let image = req.files.images;
      image.name = image.name.replace(/\s/g, "");
      image.mv(
        path.resolve(
          process.cwd() + `/public/images/voter/${req.params.id}/`,
          image.name
        ),
        async (err) => {
          if (err) {
            return res.status(500).send(err);
          }
        }
      );
      Voter.findOne().then((found) => {
        found[
          req.params.id
        ].photo = `/public/images/voter/${req.params.id}/${image.name}`;
        found.save();
        res.json({ msg: "Image updated successfully" });
      });
    }
  },
};
