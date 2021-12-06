const mongoose = require("mongoose");

const { Schema } = mongoose;

const followerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  followerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Follower", followerSchema);
