const express = require("express");
const router = express.Router();
const Following = require("../models/following.model");

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const followings = await Following.find({ userId });
    res.status(200).json({
      message: "Followings fetched successfully.",
      response: {
        followings,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const userId = req.body.userId;
    const following = await Following.findOne({ userId });
    following.followingId.push(req.body.followingId);
    await following.save();
    res.status(201).json({
      message: "following added successfully.",
      response: {
        following,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const following = await Following.findOneAndDelete({ _id: id });
    if (!following) {
      return res.status(404).json({
        message: "following does not exist.",
      });
    }
    res.status(200).json({
      message: "following removed successfully.",
      response: {
        following,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
});

module.exports = router;
