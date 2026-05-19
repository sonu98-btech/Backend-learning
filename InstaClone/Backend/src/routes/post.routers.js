const express = require('express');
const postRouter = express.Router();
const postController = require('../controllers/post.controllers');
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage()
})

// Create a new post
postRouter.post('/create', upload.single('img'), postController.PostController);

module.exports = postRouter;