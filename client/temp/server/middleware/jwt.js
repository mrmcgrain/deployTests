const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies["jwt"];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const username = decoded.username;
    if (username && username.length) {
      req.locals = decoded;
      next();
    } else {
      res.json({ message: "not auth" });
    }
  } catch {}
};
