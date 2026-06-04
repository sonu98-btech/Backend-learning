const express = require('express');
const postRouter = express.Router();
const bcrypt = require('bcrypt');
const IdentifyUser = require('../middleware/IdentifyUser');
const postController = require('../controllers/postcontroller');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

//Create Post
postRouter.post("/",  upload.single('image'), IdentifyUser, postController.createPost);
// Get All Posts
postRouter.get("/", IdentifyUser, postController.getAllPosts);
//Get Post by Id
postRouter.get("/:id", IdentifyUser, postController.getPostById);

module.exports = postRouter;
