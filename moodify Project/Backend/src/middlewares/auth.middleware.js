const jwt = require('jsonwebtoken');
const redis = require('../config/cache');

const authMiddleware = async (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized,token not found"});
    }
    const blacklistedToken = await redis.get(token);
    if(blacklistedToken){
        return res.status(401).json({message:"Unauthorized,token is blacklisted"});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized,invalid token"});
    }

}
module.exports = authMiddleware;