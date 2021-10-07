const express = require("express");
const router = express.Router();
const Profile = require("../models/profile.model");
const Post = require("../models/post.model");

router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const profile = await Profile.findOne({ userId }).populate("userId").exec();
    if (!profile) {
      return res.status(404).json({
        message: "Profile does not exist.",
      });
    }
    const posts = await Post.find({ author: userId }).populate("author").exec();
    profile.posts = posts;
    res.status(200).json({
      message: "Profile fetched successfully.",
      profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

router.put("/:profileId", async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const updatedData = req.body;
    const profile = await Profile.findOneAndDelete(
      { _id: profileId },
      { ...updatedData },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully.",
      profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

module.exports = router;
