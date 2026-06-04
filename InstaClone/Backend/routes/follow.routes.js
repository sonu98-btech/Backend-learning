const express = require("express");
const followRouter = express.Router();
const IdentifyUser = require("../middleware/IdentifyUser");
const followController = require("../controllers/followcontroller");

// Follow a user
followRouter.post("/follow/:username", IdentifyUser, followController.followUser);
// Unfollow a user
followRouter.post("/unfollow/:username", IdentifyUser, followController.unfollowUser);

module.exports = followRouter;