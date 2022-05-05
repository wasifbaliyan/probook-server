const express = require("express");
const router = express.Router();
const Follower = require("../models/follower.model");

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const followers = await Follower.find({ userId });
    res.status(200).json({
      message: "Followers fetched successfully.",
      response: {
        followers,
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
    const follower = await new Follower({
      userId,
      followerId: req.body.followerId,
    });
    await follower.save();
    res.status(201).json({
      message: "Follower added successfully.",
      response: {
        follower,
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
    const userId = req.query.userId;

    const follower = await Follower.findOneAndDelete({
      userId,
      followerId: id,
    });
    if (!follower) {
      return res.status(404).json({
        message: "follower does not exist.",
      });
    }

    res.status(200).json({
      message: "Follower removed successfully.",
      response: {
        follower,
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
