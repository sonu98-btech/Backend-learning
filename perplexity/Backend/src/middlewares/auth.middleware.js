import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js"

export const authMiddleware = async (req,res,next)=>{
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({
            message:"Token is required",
            success:false,
            err:"Token is required"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message:"Invalid token",
            success:false,
            err:"Invalid token"
        })
    }
}