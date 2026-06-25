import redis from "../config/cache/cache.js";
import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.services.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("BODY =>", req.body);

  console.log("USERNAME =>", username);
  console.log("EMAIL =>", email);
  console.log("PASSWORD =>", password);

  const isAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isAlreadyExist) {
    return res.status(400).json({
      message: "Username or email already exists",
      success: false,
      err: "user already exists",
    });
  }
  const user = await userModel.create({
    username,
    email,
    password,
  });
  const token = jwt.sign(
    {
      email,
    },
    process.env.JWT_SECRET,
  );

  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";
    const verificationUrl = `${backendUrl}/api/auth/verify-mail?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Welcome to Perplexity",
      html: `<h1>Welcome to Perplexity</h1>
          <p>Hi ${username},</p>
          <p>Click the link below to verify your email address:</p>
          <a href="${verificationUrl}">Verify Email</a>
          <p>Thank you for joining us!</p>`,
    });
    console.log("Verification email sent successfully to:", email);
  } catch (emailError) {
    console.error("Failed to send verification email:", emailError);
    return res.status(500).json({
      message: "User registered but email could not be sent",
      success: false,
      err: emailError.message,
    });
  }

  res.status(201).json({
    message: "User registered successfully",
    success: true,
    user,
  });
};
//verfiy mail controller

export const verifyMailController = async (req, res) => {
  const token = req.query.token;
  if (!token) {
    return res.status(400).json({
      message: "Token is required",
      success: false,
      err: "Token is required",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
        err: "User not found",
      });
    }
    user.verified = true;
    await user.save();
    const html = `<h1>Email Verified</h1>
     <p>Hi ${user.username},</p>
     <p>Your email has been successfully verified. You can now log in to your account and start using our services.</p>`;
    res.send(html);
  } catch (error) {
    res.status(400).json({
      message: "Invalid token",
      success: false,
      err: error.message,
    });
  }
};

//login controller
export const loginController = async (req, res) => {
  console.log("BODY =>", req.body);

  const { email, password } = req.body;

  console.log("EMAIL =>", email);
  console.log("PASSWORD =>", password);
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({
      message: "User not found",
      success: false,
      err: "User not found",
    });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid credentials",
      success: false,
      err: "Invalid credentials",
    });
  }
  if (!user.verified) {
    return res.status(400).json({
      message: "Please verify your email before logging in",
      success: false,
      err: "Email not verified",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    },
  );
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  res.status(200).json({
    message: "Login successful",
    success: true,
    user,
  });
};

///get user details controller
export const getUserDetailsController = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    return res.status(400).json({
      message: "User not found",
      success: false,
      err: "User not found",
    });
  }
  res.status(200).json({
    message: "User details fetched successfully",
    success: true,
    user,
  });
};

export const logoutController = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      message: "Token not present",
    });
  }
  await redis.set(token, Date.now().toString(), "EX", 60 * 60);
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  return res.status(200).json({
    message: "successfully loged out",
  });
};
