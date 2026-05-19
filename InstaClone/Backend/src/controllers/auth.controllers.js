const userModel = require("../model/model.user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register controller
const registerController = async (req, res) => {
  const { username, email, password, bio, profilePicture } = req.body;
  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (user) {
    return res.status(400).json({
      message: user.username
        ? "Username already exists"
        : "Email already exists",
    });
  }
  const hash = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profilePicture,
  });
  const token = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully",
    username: newUser.username,
    email: newUser.email,
    bio: newUser.bio,
    profilePicture: newUser.profilePicture,
    token,
  });
};

// Login route
const loginController = async (req, res) => {
  const { email, password, username } = req.body;
  const user = await userModel.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (!user) {
    return res.status(400).json({
      message: username ? "Username does not exist" : "Email does not exist",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid Password" });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  res.cookie("token", token);
  res.status(200).json({
    message: "User logged in successfully",
    username: user.username,
    email: user.email,
    bio: user.bio,
    profilePicture: user.profilePicture,
    token,
  });
};

module.exports = { registerController, loginController };
