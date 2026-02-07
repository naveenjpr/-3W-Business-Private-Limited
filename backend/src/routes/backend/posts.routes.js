const express = require("express");
const route = express.Router();
const PostController = require("../../controllers/backend/posts.controller");

const multer = require("multer");
const upload = multer({ dest: "uploads/images" });
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var imagepath = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + imagepath);
  },
});
const uploadImage = multer({ storage: storage }).single("image");

module.exports = (app) => {
  route.post("/add", uploadImage, PostController.create);

  route.post("/view", PostController.view);
  route.post("/like", PostController.likePost);

  app.use("/api/backend/post", route);
};
//http://localhost:5000/api/backend/post/add
//http://localhost:5000/api/backend/post/view
