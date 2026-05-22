const express = require('express');
const followRouter = express.Router();
const IdentifyUser = require("../middlewares/auth.middleware");
const followcontroller = require("../controllers/follow.controller");

// Follow a user
//api - http://localhost:3000/api/user/follow/:username
followRouter.post("/user/follow/:username", IdentifyUser,followcontroller.followController)

// Unfollow a user
//api - http://localhost:3000/api/user/unfollow/:username
followRouter.post("/user/unfollow/:username", IdentifyUser,followcontroller.unfollowController)


module.exports = followRouter;