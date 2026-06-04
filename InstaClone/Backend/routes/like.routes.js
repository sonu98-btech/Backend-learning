const express = require("express");
const likeRouter = express.Router();
const IdentifyUser = require("../middleware/IdentifyUser");
const likeController = require("../controllers/likecontroller");

// Like a post
likeRouter.post("/like/:id", IdentifyUser, likeController.likePost);
// Unlike a post
likeRouter.post("/unlike/:id", IdentifyUser, likeController.unlikePost);

module.exports = likeRouter;
