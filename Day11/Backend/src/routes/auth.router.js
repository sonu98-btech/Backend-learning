const express = require("express");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const crypto = require("crypto");
const env = require("dotenv");
env.config();
const cookies = require("cookie-parser");
authRouter.use(cookies());
module.exports = authRouter;
authRouter.use(express.json());
const noteModel = require("../models/model.notes");

// Register route
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const useralreadyexists = await noteModel.findOne({ email });
  if (useralreadyexists) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hash = crypto.createHash("md5").update(password).digest("hex");
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
  );
  res.cookie("JWT_TOKEN", token);
  res.status(201).json({
    message: "User registered successfully",
    newUser,
    token,
  });
});

//protected route
authRouter.post("/protected", (req, res) => {
    console.log(req.cookies);
});

// Login route
authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await noteModel.findOne({ email });
    if(!user){
        return res.status(404).json({ message: "email not found" });
    }
    const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex")   ;
    if(!isPasswordMatch){
        return res.status(400).json({ message: "Invalid password" });
    }
    const token = jwt.sign({
        id:user._id,

    },process.env.JWT_SECRET)
    res.status(200).json({
        message:"Login successful",
        token,
    }); 

})