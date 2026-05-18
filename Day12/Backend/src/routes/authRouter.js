const express = require("express");
const authRouter = express.Router();
const noteModel = require("../model/model.notes");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const cookiesParser = require("cookie-parser");
authRouter.use(cookiesParser());

// register api

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const isUserExist = await noteModel.findOne({ email });
  if (isUserExist) {
    return res.status(409).json({
      message: "email already exists",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const newUser = await noteModel.create({
    name,
    email,
    password: hash,
  });
  const token = jwt.sign(
    {
      id: newUser._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
  res.cookie("token", token)
  res.status(201).json({
    message: "user registered successfully",
    token,
    user: newUser,
  });
});

//login
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await noteModel.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "email not found please register first",
    });
  }
  const isPasswordMatch =
    user.password ===
    crypto.createHash("sha256").update(password).digest("hex");
  if (!isPasswordMatch) {
    return res.status(401).json({
      message: "invalid password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },

  );
   res.cookie("token", token)
  res.status(200).json({
    message: "login successful",
    token,
    user,
  });
});

// get user profile
authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "token not found",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await noteModel.findById(decoded.id);
  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  res.status(200).json({
    message: "user profile retrieved successfully",
    name: user.name,
    email: user.email,
  });
});

module.exports = authRouter;
