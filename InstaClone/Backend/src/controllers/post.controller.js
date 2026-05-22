const postModel = require("../models/model.post");
const jwt = require("jsonwebtoken");
const likeModel = require("../models/model.like");

const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT, 
})
async function  createPostController (req,res){
    const Uploadfile = await imagekit.files.upload({
        file:await toFile(
            req.file.buffer,
            req.file.originalname
        ),
        fileName : req.file.originalname,
    folder : "Instaclone-post"
    })
   
    const user = req.user.id;
    const caption = req.body.caption;
    const img = Uploadfile.url;
    const post = await postModel.create({
        caption,
        img,
        user
    });
    res.status(201).json({
        message:"Post created successfully",
        post
    })
}
async function getAllPostsController(req,res){
    userId = req.user.id;
    const posts = await postModel.find({ user: userId });
    if(posts.length === 0){
        return res.status(404).json({
            message:"No posts found"
        })
    }
    res.status(200).json({
        message:"Posts found",
        posts
    })
}  

//get details of a single post
async function getPostDetailController(req,res){
   
    const user = req.user.id;
    const postId = req.params.id;
    const post = await postModel.findOne({_id:postId});
    if(post.length === 0){
        return res.status(404).json({
            message:"Post not found"
        })
    }
    const isValidUser = post.user.toString() === user;
    if(!isValidUser){
        return res.status(403).json({
            message:"Forbidden access "
        })
    }
    res.status(200).json({
        message:"Post found",
        post
    })
}
//like a post
async function likePostController(req,res){
    const userId = req.user.id;
    const postId = req.params.postid;
    const isValidPost = await postModel.findOne({_id:postId});
    if(!isValidPost){
        return res.status(404).json({
            message:"Post not found"
        })
    }
    const isAlreadyLiked = await likeModel.findOne({
        postId,
        userId
    });
    if(isAlreadyLiked){
        return res.status(400).json({
            message:"You have already liked this post"
        })
    }
    const like = await likeModel.create({
        postId,
        userId
    });
    res.status(201).json({
        message:"Post liked successfully",
        like
    })
}
// unlike a post 
async function unlikePostController(req,res){
    const userId = req.user.id;
    const postId = req.params.postid;
    const isAlreadyLiked = await likeModel.findOne({
        postId,
        userId
    });
    if(!isAlreadyLiked){
        return res.status(400).json({
            message:"You have not liked this post"
        })
    }
    await likeModel.findOneAndDelete({
        postId,
        userId
    })
    res.status(200).json({
        message:"Post unliked successfully",
    })
}

module.exports = {
    createPostController,
    getPostDetailController,
    getAllPostsController,
    likePostController,
    unlikePostController
}

