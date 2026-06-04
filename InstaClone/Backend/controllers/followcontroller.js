const userModel = require("../model/user.model");
const followModel = require("../model/follow.model");

// Follow a user
const followUser = async (req, res) => {
    const username = req.user.username;
    const followeeusername = req.params.username;
    const isFolloweeExist = await userModel.findOne({ username: followeeusername });
    console.log(isFolloweeExist);
    if (!isFolloweeExist) {
        return res.status(404).json({
            message: "User not found",
        });
    }
    const isAlreadyFollowing = await followModel.findOne({
        follower: username,
        followee: followeeusername
    });

    if (isAlreadyFollowing) {
        return res.status(400).json({
            message: "You are already following this user",
        });
    }
    if (username === followeeusername) {
        return res.status(400).json({
            message: "You cannot follow yourself",
        });
    }
    const followinfo = await followModel.create({
        follower: username,
        followee: followeeusername
    });
    res.status(201).json({
        message: "User followed successfully",
        data: followinfo
    });
}
// Unfollow a user
const unfollowUser = async (req, res) => {
    const username = req.user.username;
    const followeeusername = req.params.username;
    const isFollowerExist = await followModel.findOne({
        follower: username ,
        followee: followeeusername
    });
    if (!isFollowerExist) {
        return res.status(400).json({
            message: "You are not following this user",
        });
    }
    await followModel.deleteOne({
        follower: username,
        followee: followeeusername
    });
    res.status(200).json({
        message: "User unfollowed successfully"
    });
}
module.exports = {
    followUser,
    unfollowUser
}