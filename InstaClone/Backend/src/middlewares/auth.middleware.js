const jwt = require("jsonwebtoken");

function IdentifyUser(req, res, next) {
     const token =req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"Unauthorized not not present"
            })
        }
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({
                message:"Invalid token"
            })
        }
        req.user = decoded;
        next();
}
module.exports = IdentifyUser;