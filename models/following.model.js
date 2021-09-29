const mongoose = require("mongoose");

const { Schema } = mongoose;

const followingSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  followingId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Following", followingSchema);
