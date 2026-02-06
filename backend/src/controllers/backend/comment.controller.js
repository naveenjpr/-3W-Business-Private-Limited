const Comment = require("../../models/comment");

// POST COMMENT
exports.postComment = async (req, res) => {
  try {
    const { text, userId, postId } = req.body;


    if (!text || !userId || !postId) {
      return res.status(400).json({
        message: "text, userId and postId are required"
      });
    }

    const comment = new Comment({
      text,
      post: postId,
      user: userId
    });

    const savedComment = await comment.save();

    res.status(201).json({
      message: "Comment posted successfully",
      data: savedComment
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to post comment",
      error: error.message
    });
  }
};


// GET ALL COMMENTS OF A POST
exports.getAllComments = async (req, res) => {
  try {
    const postId = req.params.id;
    console.log(postId)

    const comments = await Comment.find({ post: postId })
      .populate("user", "firstName lastName Email")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch comments",
      error: error.message
    });
  }
};
