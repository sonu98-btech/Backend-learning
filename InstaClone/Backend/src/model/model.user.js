const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default:
      "https://ik.imagekit.io/yuhb2zywe/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.webp?updatedAt=1779106271251",
  },
  bio: {
    type: String,
    default: "",
  },
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
