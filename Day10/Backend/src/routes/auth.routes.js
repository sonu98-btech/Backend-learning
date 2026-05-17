const express = require("express");
const mongoose = require("mongoose");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const noteModel = require("../models/model.notes");

authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userAlreadyExists = await noteModel.findOne({ email });
  if (userAlreadyExists) {
    return res.status(400).json({ message: "email already exists" });
  }
  const newUser = await noteModel.create({ name, email, password });
  
  const token = jwt.sign({
    id:newUser._id,
    email:newUser.email
  },
  process.env.JWT_SECRET
);
res.cookie("jwt_token", token)
res.status(201).json({
    message: "user registered successfully",
    newUser,
    token
  });
});

module.exports = authRouter;
