const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

module.exports = {
  login: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.json({ error: "Authentication failed" });
      }
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordMatch) {
        return res.json({ error: "Authentication failed" });
      } else {
        const token = await jwt.sign(
          { username: user.username },
          process.env.SECRET_KEY,
          { expiresIn: 36000000 }
        );
        res
          .cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            maxAge: 36000000,
          })
          .status(200)
          .json({ message: "Login successful", token: token });
      }
    } catch (error) {
      res.json({ error: "Login failed" });
    }
  },
  updatePass: (req, res) => {
    User.findByOne({ username: req.body.username })
      .then((found) => {
        const hash = bcrypt.hashSync(req.body.password, 10);
        found.password = hash;
        found.save();
      })
      .catch((err) => console.log("password Change Error", err));
  },
  createUser: (req, res) => {
    User.find({ username: req.body.username }).then((found) => {
      if (found.length) {
        res.json({ message: "Error", Error: "Username already exists" });
      } else {
        const hash = bcrypt.hashSync(req.body.password, 10);
        const newUser = new User({
          username: req.body.username,
          password: hash,
        });
        User.create(newUser)
          .then((created) => {
            res.json({ message: "Success", user: created });
          })
          .catch((err) => console.log("create user error", err));
      }
    });
  },

  authCheck: (req, res) => {
    if (!req.cookies["jwt"]) {
      res.json({ message: "go away" });
    }
    if (req.cookies["jwt"]) {
      let decode = jwt.verify(req.cookies["jwt"], process.env.SECRET_KEY);
      if (decode.username) {
        res.json({ message: "proceed", user: decode });
      } else {
        res.json({ message: "token expired" });
      }
    }
  },

  logout: (req, res) => {
    res
      .cookie("jwt", "LOGGEDOUT", { expiresIn: new Date(Date.now) })
      .status(201)
      .json({ Logged: "Out" });
  },
};
