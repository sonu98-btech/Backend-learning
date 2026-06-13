import express from "express"
import { registerUser } from "../controllers/auth.controller.js"
import {registerValidate} from "../validation/auth.validation.js"
const AuthRouter = express.Router()


AuthRouter.post("/register",registerValidate,registerUser)

export default AuthRouter