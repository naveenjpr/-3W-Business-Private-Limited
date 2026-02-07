const userPost = require("../../models/posts");

exports.create = async (req, res) => {
  try {
    const data = new userPost({
      post: req.body.post,
      image: req.file ? req.file.filename : null,
      user: req.body.user, // logged in user id
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

    res.status(200).json({
      status: true,
      imagePath: "uploads/images/",
      data: posts,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { postId, userId, username } = req.body;

    const post = await userPost.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.find(
      (like) => like.userId.toString() === userId,
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (like) => like.userId.toString() !== userId,
      );
    } else {
      post.likes.push({ userId, username });
    }

    await post.save();

    res.status(200).json({
      message: "Like updated",
      likesCount: post.likes.length,
      likes: post.likes,
    });
  } catch (error) {
    res.status(500).json({ message: "Like failed", error: error.message });
  }
};
