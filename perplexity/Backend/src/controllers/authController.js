import userModel from "../models/user.model.js"
import  {sendEmail}  from "../services/mail.services.js"
import jwt from "jsonwebtoken"
export const registerController = async (req,res)=>{
    const {username,email,password} = req.body


    const isAlreadyExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isAlreadyExist){
        return res.status(400).json({
            message:"Username or email already exists",
            success:false,
            err:"user already exists"
        })
    }
    const user = await userModel.create({
        username,
        email,
        password
    })
    const token = jwt.sign({
        email
    }, process.env.JWT_SECRET)
    await sendEmail({
        to:email,
        subject:"Welcome to Perplexity",
        html:`<h1>Welcome to Perplexity</h1>
        <p>Hi ${username},</p>
        <p>Click the link below to verify your email address:</p>
        <a href="http://localhost:3000/api/auth/verify-mail?token=${token}">Verify Email</a>
        <p>Thank you for joining us!</p>`
    })
    res.status(201).json({
        message:"User registered successfully",
        success:true,
        user
    })

}
//verfiy mail controller

export const verifyMailController = async (req,res)=>{
    const token = req.query.token
    if(!token){
        return res.status(400).json({
            message:"Token is required",
            success:false,
            err:"Token is required"
        })
    }
    try {
        
      const decoded = jwt.verify(token,process.env.JWT_SECRET)
     const user = await userModel.findOne({email:decoded.email})
     if(!user){
        return res.status(400).json({
            message:"User not found",
            success:false,
            err:"User not found"
        })
     }
     user.verified = true
     await user.save()
     const html = `<h1>Email Verified</h1>
     <p>Hi ${user.username},</p>
     <p>Your email has been successfully verified. You can now log in to your account and start using our services.</p>`
     res.send(html)
     
     } catch (error) {
        res.status(400).json({
            message:"Invalid token",
            success:false,
            err: error.message
        })
    }
      
}

//login controller
export const loginController = async (req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        return res.status(400).json({
            message:"User not found",
            success:false,
            err:"User not found"
        })
    }
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return res.status(400).json({
            message:"Invalid credentials",
            success:false,
            err:"Invalid credentials"
        })
    }
    if(!user.verified){
        return res.status(400).json({
            message:"Please verify your email before logging in",
            success:false,
            err:"Email not verified"
        })
    }
    const token = jwt.sign({
        id:user._id,
        email:user.email
    }, process.env.JWT_SECRET,{
        expiresIn: "1d"
    })
    res.cookie("token",token)
    res.status(200).json({
        message:"Login successful",
        success:true,
        token
    })
}

///get user details controller
export const getUserDetailsController = async (req,res)=>{
    const user = await userModel.findById(req.user.id)
    if(!user){
        return res.status(400).json({
            message:"User not found",
            success:false,
            err:"User not found"
        })
    }
    res.status(200).json({
        message:"User details fetched successfully",
        success:true,
        user
    })
}
