const postModel = require("../model/post.model");
const likeModel = require("../model/like.model");

const likePost = async (req, res) => {
  const userId = req.user?.id;
  const postId = req.params.id;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const alreadyLiked = await likeModel.findOne({ user: userId, post: postId });
  if (alreadyLiked) {
    return res.status(400).json({
      message: "You have already liked this post",
    });
  }

  const like = await likeModel.create({
    user: userId,
    post: postId,
  });

  res.status(201).json({
    message: "Post liked successfully",
    data: like,
  });
};

const unlikePost = async (req, res) => {
  const userId = req.user?.id;
  const postId = req.params.id;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const like = await likeModel.findOne({ user: userId, post: postId });
  if (!like) {
    return res.status(400).json({
      message: "You have not liked this post",
    });
  }

  await likeModel.deleteOne({ user: userId, post: postId });

  res.status(200).json({
    message: "Post unliked successfully",
  });
};

module.exports = {
  likePost,
  unlikePost,
};
