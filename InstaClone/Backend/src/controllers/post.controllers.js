const postModel = require("../model/model.post");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const { Folders } = require("@imagekit/nodejs/resources/index.js");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const imagekit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,

});

const postcontroller = async (req, res) => {

    console.log(req.body, req.file);

    const uploadedFile = await imagekit.files.upload({
      file: await toFile(
        req.file.buffer,
        req.file.originalname
      ),
      fileName: req.file.originalname,
      folder : "InstaClone-post",
    });
  
  
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({ message: "Unauthorized token not present" });
  }
  let decoded = null;
  try{
    decoded = jwt.verify( token , process.env.JWT_SECRET);
    console.log(decoded);
    
  }catch(err){
    console.log(err);
    return res.status(401).json({ message: "Unauthorized token" });
  }
  const caption = req.body.caption;
  const img = uploadedFile.url;
  const user = decoded.id;
  const userPost = await postModel.create({ caption, img, user });
  res.status(201).json({ message: "Post created successfully", post: userPost });
};

const getAllPosts = async (req, res) => {
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({ message: "Unauthorized token not present" });
  }
  let decoded 
  try{
    decoded = jwt.verify( token , process.env.JWT_SECRET);
  }catch(err){
    console.log(err);
    return res.status(401).json({ message: "Unauthorized token" });
  }
  const userId = decoded.id
  const posts = await postModel.find({user:userId});
  if(!posts) {
    return res.status(404).json({ message: "No posts found for the user" });
  }
  
  res.status(200).json({ message: "Posts retrieved successfully", posts });

}

const getPostDetail = async (req, res) => {
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({ message: "Unauthorized token not present" });
  }
  let decoded 
  try{
    decoded = jwt.verify( token , process.env.JWT_SECRET);
  }catch(err){
    console.log(err);
    return res.status(401).json({ message: "Unauthorized token" });
  }
  const userId = decoded.id
  const postId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(404).json({
      message: "Post not found"
    });
  }
  const post = await postModel.findById(postId);
  if(!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const isValidUser = post.user.toString() === userId;
  if(!isValidUser){
    return res.status(403).json({ message: "Forbidden: You do not have access to this post" });
  }
  res.status(200).json({ message: "Post retrieved successfully", post });
}

module.exports = { postcontroller , getAllPosts , getPostDetail };