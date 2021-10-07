const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const generateAuthToken = require("../utils/generateAuthToken");
const router = express.Router();
const Profile = require("../models/profile.model");

router.post("/register", async (req, res) => {
  try {
    const { email } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({
        message: "User with this email already exists.",
      });
    } else {
      const user = await new User(req.body);
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(user.password, salt);
      await user.save();

      const token = generateAuthToken(user._id);
      const profile = await new Profile({ userId: user._id });
      await profile.save();
      return res.status(201).json({
        message: "User created successfully.",
        response: {
          name: user.name,
          email: user.email,
          _id: user._id,
          token,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(403).json({
        message: "Incorrect email or password!",
      });
    } else {
      const isPasswordValid = bcrypt.compare(password, foundUser.password);
      if (!isPasswordValid) {
        return res.status(403).json({
          message: "Incorrect email or password.",
        });
      }

      const token = generateAuthToken(foundUser._id);

      return res.status(200).json({
        message: "Logged in successfully.",
        response: {
          token,
          name: foundUser.name,
          email: foundUser.email,
          _id: foundUser._id,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error: error.message,
    });
  }
});

module.exports = router;
