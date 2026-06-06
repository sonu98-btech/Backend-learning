const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Register Controller
async function registerController(req,res){
    const {username,email,password,bio,profilePicture} = req.body;
    const AlreadyUserExists = await userModel.findOne({
      $or:[
        {username:username},
        {email: email}
      ]  
    });
    if(AlreadyUserExists){
        return res.status(400).json({
            message: AlreadyUserExists.username === username ? 'Username already exists' : 'Email already exists'
        })
    }
    const passwordHash = bcrypt.hashSync(password,10);
   
    const user = await userModel.create({
        username,
        email,
        password: passwordHash,
        bio,
        profilePicture
    });
     const token = jwt.sign({
        id:user._id,
        username: user.username,
    },process.env.JWT_SECRET,{
        expiresIn: '1d'
    });
    res.cookie('token', token)
    res.status(201).json({
        message: 'User created successfully',
        user:{
            username : user.username,
            email: user.email,
            bio: user.bio,
            profilePicture: user.profilePicture,
            token: token
        }
    });
}
//Login Controller
async function loginController(req,res){
    const {username,email,password} = req.body;
    const IsUserExists = await userModel.findOne({
        $or:[
            {username: username},
            {email: email}
        ]
    }).select('+password');
    if(!IsUserExists){
        return res.status(400).json({
            message:username  ? 'Username does not exist' : 'Email does not exist'
        })
    }
    const isPasswordValid = await bcrypt.compare(password, IsUserExists.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: 'Invalid password'
        })
    }
    const token = jwt.sign({
        id: IsUserExists._id,
        username: IsUserExists.username
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    res.cookie('token', token);
    res.status(200).json({
        message: 'Login successful',
        user: {
            username: IsUserExists.username,
            email: IsUserExists.email,
            bio: IsUserExists.bio,
            profilePicture: IsUserExists.profilePicture,
            token: token
        }
    });
}

// Get Me Controller
async function getMeController(req,res){
    const user = await userModel.findById(req.user.id);
    if(!user){
        return res.status(404).json({
            message: 'User not found'
        })
    }
    res.status(200).json({
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePicture: user.profilePicture
        }
    });
}

module.exports = {
    registerController,
    loginController,
    getMeController
}