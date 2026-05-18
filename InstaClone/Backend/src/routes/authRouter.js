const express = require("express");
const authRouter = express.Router();

const authController = require("../controllers/auth.controller");
// Register api

authRouter.post("/register", authController.registerController);

//login api
authRouter.post("/login", authController.loginController);
module.exports = authRouter;
