const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const privateKey = process.env.JWT_KEY;

const verifyAuthentication = async (req, res, next) => {
  try {
    const bearerToken = req.headers["authorization"];
    const token = bearerToken.split(" ")[1];
    const decoded = jwt.verify(token, privateKey);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({
        message: "You're not authorized to acess this information.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "You're not authorized to acess this information.",
      error: error.message,
    });
  }
};

module.exports = verifyAuthentication;
