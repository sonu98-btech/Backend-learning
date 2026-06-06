const postModel = require("../model/post.model");
const likeModel = require("../model/like.model");
const mongoose = require("mongoose");

// Like a post
const likePost = async (req, res) => {
  try {
    // Fix: Drop old index if it exists (one-time cleanup)
    try {
      await likeModel.collection.dropIndex("postId_1_userId_1");
      console.log("[likePost] Dropped old index");
    } catch (e) {
      // Index doesn't exist, that's fine
    }

    const userId = req.user?.id;
    const postId = req.params.id;

    console.log("[likePost] userId:", userId, "postId:", postId);

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized - no user id",
      });
    }

    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        message: "Post id is required and must be valid.",
      });
    }

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    const existingLike = await likeModel.findOne({
      post: postId,
      user: userId,
    });
    if (existingLike) {
      return res.status(400).json({
        message: "You have already liked this post.",
      });
    }

    const like = await likeModel.create({
      post: postId,
      user: userId,
    });

    res.status(200).json({
      message: "Post liked successfully.",
      like,
    });
  } catch (error) {
    console.error("[likePost] Error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
// Unlike a post
const unlikePost = async (req, res) => {
  const userId = req.user?.id;
  const postId = req.params.id;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
      message: "Post id is required and must be valid.",
    });
  }

  const like = await likeModel.findOneAndDelete({
    post: postId,
    user: userId,
  });

  if (!like) {
    return res.status(400).json({
      message: "You have not liked this post.",
    });
  }

  res.status(200).json({
    message: "Post unliked successfully.",
    like,
  });
};
module.exports = {
  likePost,
  unlikePost,
};
