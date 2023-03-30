const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET;
const User = require("../models/User");

const auth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = await jwt.verify(token, JWT_SECRET_KEY);
      req.user = await User.findById(decoded.user.id).select("-password");
      next();
    } catch (err) {
      res.status(401);
      res.json({ msg: "Not Authorized", code: 401 });
    }
  } else {
    res.status(403);
    res.json({ msg: "Not Authorized, No token Found", code: 403 });
  }
};
module.exports = auth;
