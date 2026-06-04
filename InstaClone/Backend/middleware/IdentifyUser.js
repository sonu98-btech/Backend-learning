const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');

async function IdentifyUser(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message: "Access denied. No token provided."
        })
    }
    let decoded;
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token."
        })
    }
    req.user = decoded; // Attach the decoded user information to the request object
    next();
}
module.exports = IdentifyUser;