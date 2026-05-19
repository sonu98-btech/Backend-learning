const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controllers');

// Register route

authRouter.post("/register", authController.registerController);

// Login route

authRouter.post("/login", authController.loginController);
module.exports = authRouter;