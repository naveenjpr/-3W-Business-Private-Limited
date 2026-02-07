const express = require("express");
const route = express.Router();
const PostController = require("../../controllers/backend/posts.controller");

// ✅ Cloudinary upload middleware
const upload = require("../../config/upload").default;

module.exports = (app) => {
  // CREATE POST (with image)
  route.post("/add", upload.single("image"), PostController.create);

  // VIEW POSTS
  route.post("/view", PostController.view);

  // LIKE / UNLIKE POST
  route.post("/like", PostController.likePost);

  app.use("/api/backend/post", route);
};
//http://localhost:5000/api/backend/post/add
//http://localhost:5000/api/backend/post/view
//http://localhost:5000/api/backend/post/like
