const express = require("express");
const router = express.Router();
const Post = require("../models/post.model");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json({
      response: {
        posts,
      },
      message: "Posts fetched successfully.",
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
    const author = {
      name: req.user.name,
      handle: req.user.handle,
      _id: req.user._id,
    };
    const post = await new Post({ author, ...req.body });
    await post.save();
    res.status(201).json({
      response: {
        post,
      },
      message: "Post created successfully.",
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
