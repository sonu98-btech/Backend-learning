const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const AuthRouter = express.Router();
const AuthController = require('../controllers/auth.controllers');
const authMiddleware = require('../middlewares/auth.middleware');

// Register Route
AuthRouter.post("/register", AuthController.registerController);

// Login Route
AuthRouter.post("/login", AuthController.loginController);

// Logout Route
AuthRouter.post("/logout", AuthController.logoutController);


//getme Route
AuthRouter.get("/get-me", authMiddleware, AuthController.getMeController);


module.exports = AuthRouter;