import {Router} from 'express';
import {registerController} from "../controllers/authController.js"
// import {registerValidator} from "../validators/auth.validator.js"
import {verifyMailController,loginController,getUserDetailsController} from "../controllers/authController.js"
import {authMiddleware} from "../middlewares/auth.middleware.js"
const AuthRouter = Router();


// register route
AuthRouter.post('/register',registerController)

//mail verification route
AuthRouter.get('/verify-mail', verifyMailController)

//login route
AuthRouter.post('/login', loginController)
//get user details route
AuthRouter.get('/get-me', authMiddleware, getUserDetailsController)

export default AuthRouter



