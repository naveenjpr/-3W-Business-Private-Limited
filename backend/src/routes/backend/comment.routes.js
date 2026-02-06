const express = require("express");
const route = express.Router();
const PostController = require("../../controllers/backend/comment.controller");

module.exports = (app) => {
  route.post("/postComment", PostController.postComment);

  route.post("/getAllComments/:id", PostController.getAllComments);

  app.use("/api/backend/comment", route);
};

//http://localhost:5000/api/backend/comment/postComment
//http://localhost:5000/api/backend/comment/getAllComments/:id