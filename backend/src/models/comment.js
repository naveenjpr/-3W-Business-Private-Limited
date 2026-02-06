const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true
    }
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comments", commentSchema);

module.exports = Comment;
