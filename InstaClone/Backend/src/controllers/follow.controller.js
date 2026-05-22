const followModel = require('../models/model.follower');
const userModel = require('../models/model.user');


// Follow controller
async function followController(req,res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;
    const isfolloweeExist = await userModel.findOne({ username: followeeUsername });
    if (!isfolloweeExist) {
        console.log(isfolloweeExist)
        return res.status(404).json({
            message: "User not found"
        });
    }
    if(followerUsername === followeeUsername){
        return res.status(400).json({
            message: "You cannot follow yourself"
        });
    }
    const isAlreadyFollowing = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })
    if (isAlreadyFollowing) {
        return res.status(400).json({
            message: "You are already following this user"
        });
    }
    const followData = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })
    res.status(201).json({
        message: "User followed successfully",
        followData
    })
}

// Unfollow controller
async function unfollowController(req,res){
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;
    const isFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })
    
    if (!isFollowing) {
        return res.status(400).json({
            message: `You are not following this ${followeeUsername}`
        });
    }
     const unfollowData = await followModel.findOneAndDelete({
        follower: followerUsername,
        followee: followeeUsername          
    })
    res.status(200).json({
        message: "User unfollowed successfully",
        unfollowData
    })
}
module.exports = {
    followController,
    unfollowController
}