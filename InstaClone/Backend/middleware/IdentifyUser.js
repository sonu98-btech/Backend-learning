const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

async function IdentifyUser(req, res, next) {
  let token = req.cookies?.token;
  console.log("[IdentifyUser] cookie token:", token ? "exists" : "missing");

  if (!token && req.headers?.authorization) {
    const [scheme, value] = req.headers.authorization.split(" ");
    console.log(
      "[IdentifyUser] auth header parts:",
      scheme,
      value ? "value exists" : "no value",
    );
    if (scheme === "Bearer" && value) {
      token = value;
      console.log("[IdentifyUser] Bearer token extracted");
    }
  }

  if (!token) {
    console.log("[IdentifyUser] No token found");
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(
      "[IdentifyUser] Token decoded successfully, user id:",
      decoded?.id,
    );
  } catch (error) {
    console.error("[IdentifyUser] Token verification failed:", error.message);
    return res.status(401).json({
      message: "Invalid token.",
    });
  }

  req.user = decoded; // Attach the decoded user information to the request object
  next();
}
module.exports = IdentifyUser;
