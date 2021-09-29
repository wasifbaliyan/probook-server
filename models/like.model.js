const mongoose = require("mongoose");

const { Schema } = mongoose;

const likeSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Like", likeSchema);
