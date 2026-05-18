const userModel = require("../models/model.notes");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  const { username, email, password, bio, profilePicture } = req.body;
  const existingUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    return res.status(409).json({
      message:
        "Username or email already exists" +
        (existingUser.username === username
          ? "username already exists"
          : " email already exists"),
    });
  }
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const newUser = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profilePicture,
  });
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token);
  res
    .status(201)
    .json({
      message: "User registered successfully",
      username: newUser.username,
      email: newUser.email,
      bio: newUser.bio,
      profilePicture: newUser.profilePicture,
    });
}

const loginController = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (!user) {
    return res.status(404).json({
      message: user.username !== username
        ? "username not found"
        : " email not found",  
    });
  }
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  if (user.password !== hash) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token);
  res
    .status(200)
    .json({
      message: "User logged in successfully",
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
    });
}

module.exports = { registerController, loginController };