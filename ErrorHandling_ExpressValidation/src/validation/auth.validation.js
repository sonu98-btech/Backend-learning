import {body,validationResult} from "express-validator"

const validate=(req,res,next)=>{
        const errors=validationResult(req)
        if(errors.isEmpty()){
            return next()
        }
        res.status(400).json({
            errors:errors.array()
        })
    }

export const registerValidate=[
    body("username").isString().withMessage("username must be a string"),
    body("email").isEmail().withMessage("email must be in form of email"),
    validate
    
]