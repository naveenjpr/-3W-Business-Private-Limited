const express = require("express");
const route = express.Router();
const PostController = require("../../controllers/backend/posts.controller");

const upload = require("../../config/upload");

module.exports = (app) => {
  route.post("/add", upload.single("image"), PostController.create);

  route.post("/view", PostController.view);

  route.post("/like", PostController.likePost);

  app.use("/api/backend/post", route);
};
//http://localhost:5000/api/backend/post/add
//http://localhost:5000/api/backend/post/view
//http://localhost:5000/api/backend/post/like
