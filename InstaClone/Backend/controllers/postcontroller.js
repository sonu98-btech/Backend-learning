const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const { get } = require("mongoose");
const postModel = require("../model/post.model");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});
// Create Post
const createPost = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  const uploadfile = await imagekit.files.upload({
    file: await toFile(req.file.buffer, req.file.originalname),
    fileName: req.file.originalname,
    folder: "Instaclone",
  });
  const { caption } = req.body;
  const newPost = await postModel.create({
    caption,
    imgUrl: uploadfile.url,
    user: userId,
  });
  res.status(201).json({
    message: "Post created successfully",
    post: newPost,
  });
};
// Get All Posts
const getAllPosts = async (req, res) => {
  userId = req.user.id;
  const posts = await postModel.find({ user: userId });
  if (!posts) {
    return res.status(404).json({
      message: "Posts not found",
    });
  }
  res.status(200).json({
    message: "Posts retrieved successfully",
    posts: posts,
  });
};
// Get Post by Id
const getPostById = async (req, res) => {
  const postId = req.params.id;
  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }
  res.status(200).json({
    message: "Post retrieved successfully",
    post: post,
  });
};


module.exports = {
  createPost,
  getAllPosts,
  getPostById
};
