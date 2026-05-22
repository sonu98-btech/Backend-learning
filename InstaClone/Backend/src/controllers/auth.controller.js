const userModel = require('../models/model.user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register controller
async function registerController(req, res) {
  const { username, email, password, profilePicture, bio } = req.body;
  const user = await userModel.findOne({ $or: [{ username }, { email }] });
  if (user) {
    return res.status(400).json({
      message:
        user.username === username
          ? "Username already exists"
          : "Email already exists",
    });
  }
  const hash = await bcrypt.hash(password, 10);

 
  const newUser = await userModel.create({
    username,
    email,
    password: hash,
    profilePicture,
    bio,
  });
    const token = jwt.sign(
    {
      id: newUser._id,
      username: newUser.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
   res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    newUser,
    token,
  });
}

//login controller

async function loginController(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    return res.status(400).json({
      message:
        user.username === username ? "Invalid username" : "Invalid email",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "Login successful",
    user,
    token,
  });
}

module.exports = {
    registerController, 
    loginController
}