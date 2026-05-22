const express = require("express");
const authRouter = express.Router();



const authController = require("../controllers/auth.controller");

// Register route
authRouter.post("/register", authController.registerController);

//login Route

authRouter.post("/login", authController.loginController);

module.exports = authRouter;