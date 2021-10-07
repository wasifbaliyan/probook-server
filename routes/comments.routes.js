const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });
    if (!post) {
      return res.status(404).json({
        message: "The post you were looking for is not available.",
      });
    }
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("author")
      .exec();
    res.status(200).json({
      message: "Comments fetched successfully.",
      response: {
        comments,
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

router.post("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const author = req.user._id;
    const comment = await new Comment({ postId, author, text: req.body.text });
    await comment.save();
    res.status(201).json({
      message: "Comment created successfully.",
      response: {
        comment,
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

router.delete("/:postId/:commentId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const comment = await Comment.findOneAndDelete({ postId, _id: commentId });
    if (!comment) {
      return res.status(404).json({
        message: "Comment does not exist.",
      });
    }
    res.status(200).json({
      message: "Comment deleted successfully.",
      response: {
        comment,
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
