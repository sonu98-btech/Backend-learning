const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const blacklistModel = require('../models/blacklist');     
const redis = require('../config/cache');

const registerController = async (req,res) => {
    const {username,email,password} = req.body;
    const existingUser = await userModel.findOne({
        $or:[{username:username},{email:email}]
    });
    if(existingUser){
        return res.status(400).json({message:"Username or Email already exists"});
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await userModel.create({
        username,
        email,
        password: hashedPassword
    });
   
    const token = jwt.sign({id:newUser._id,username:newUser.username},process.env.JWT_SECRET,{expiresIn:'1d'});
    res.cookie("token", token);
     res.status(201).json({message:"User registered successfully",
     user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
     },
     token
    });
};

const loginController = async (req,res) => {
    const {username,email,password} = req.body;
    const user = await userModel.findOne({
        $or:[{username:username},{email:email}]
    });
    if(!user){
        return res.status(400).json({message:"Invalid credentials"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"});
    }
    const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:'1d'});
    res.cookie("token", token);
    res.status(200).json({message:"Login successful",
    user: {
        id: user._id,
        username: user.username,
        email: user.email
        
    },
    token
});
}


// Logout Controller

const logoutController = async (req,res) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(400).json({message:"Token not found"});
    }
    const blacklistedToken = await redis.set(token, Date.now().toString(), 'EX', 60 * 60); // Expire in 24 hours
    res.clearCookie("token");
    res.status(200).json({message:"Logout successful"});
}

//getme controller
const getMeController = async (req,res) => {
     const userId = req.user.id;
     const user = await userModel.findById(userId).select("-password");
     res.status(200).json({user});
}

module.exports = {
    registerController,
    loginController,
    logoutController,
    getMeController
}