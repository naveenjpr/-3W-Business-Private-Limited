const userPost = require("../../models/posts");

exports.create = async (req, res) => {
  try {
    const data = new userPost({
      post: req.body.post,
      image: req.file ? req.file.filename : null,
      user: req.body.user   // logged in user id
    });

    const saved = await data.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json({ error: "Post create failed" });
  }
};


exports.view = async (req, res) => {
  try {
    const posts = await userPost
      .find()
      .populate("user", "firstName lastName Email")
      .sort({ date: -1 });

    res.status(200).json(posts);

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};
