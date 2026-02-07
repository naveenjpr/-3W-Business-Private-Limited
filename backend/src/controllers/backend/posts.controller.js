const userPost = require("../../models/posts");

exports.create = async (req, res) => {
  try {
    const data = new userPost({
      post: req.body.post || "",
      image: req.file ? req.file.path : null,
      user: req.body.user,
    });

    const saved = await data.save();

    res.status(201).json({
      status: true,
      message: "Post created successfully",
      data: saved,
    });
  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({
      status: false,
      message: "Post create failed",
      error: err.message,
    });
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
      data: posts,
    });
  } catch (err) {
    console.error("View posts error:", err);
    res.status(500).json({
      status: false,
      message: "Failed to fetch posts",
      error: err.message,
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { postId, userId, username } = req.body;

    const post = await userPost.findById(postId);

    if (!post) {
      return res.status(404).json({
        status: false,
        message: "Post not found",
      });
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
      status: true,
      message: "Like updated successfully",
      likesCount: post.likes.length,
      likes: post.likes,
    });
  } catch (error) {
    console.error("Like post error:", error);
    res.status(500).json({
      status: false,
      message: "Like failed",
      error: error.message,
    });
  }
};
