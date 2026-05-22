const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/post.controller');
const IdentifyUser = require("../middlewares/auth.middleware");
const multer = require('multer');
const { post } = require('./auth.router');
 const upload = multer({
    storage: multer.memoryStorage()
});


// Create a new post
//api - http://localhost:3000/api/post
postRouter.post('/', upload.single('img'), IdentifyUser, postController.createPostController);

// Get all posts
//api - http://localhost:3000/api/post
postRouter.get('/', IdentifyUser, postController.getAllPostsController);

// Get details of a single post
//api - http://localhost:3000/api/post/:id
postRouter.get('/:id', IdentifyUser, postController.getPostDetailController);

// Like a post
//api - http://localhost:3000/api/post/like/:postid
postRouter.post('/like/:postid', IdentifyUser, postController.likePostController);
// Unlike a post
//api - http://localhost:3000/api/post/unlike/:postid
postRouter.post('/unlike/:postid', IdentifyUser, postController.unlikePostController);

module.exports = postRouter;