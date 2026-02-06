const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },

  post: {
    type: String
  },

  image: {
    type: String
  },

  likes: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      username: String
    }
  ],

  comments: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      username: String,
      text: String,
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true
  }
});
const postModel = mongoose.model("Posts", postSchema);
module.exports = postModel;