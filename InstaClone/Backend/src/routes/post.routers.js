const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controllers");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

// Create a new post (accept both / and /create)
postRouter.post("/", upload.single("img"), postController.postcontroller);

// get all posts if user is authenticated
postRouter.get("/", postController.getAllPosts);

// get post detail with specific post id and also check if post belongs to the user that is requesting the post detail
postRouter.get("/:id", postController.getPostDetail);

module.exports = postRouter;
