const express = require('express');
const authRouter = express.Router();
const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authController = require('../controllers/authcontroller');
const  IdentifyUser = require('../middleware/IdentifyUser') ;

//Register Route
authRouter.post('/register', authController.registerController);
//Login Route
authRouter.post('/login', authController.loginController);
// get me route
authRouter.get('/get-me', IdentifyUser, authController.getMeController);
module.exports = authRouter;