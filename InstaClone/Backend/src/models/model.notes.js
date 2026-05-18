const mongoose=require("mongoose")
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,"username must be unique"]
    },
    email:{
        type:String,
        required:true,
        unique:[true,"email must be unique"]
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String,    
    },
    profilePicture:{
        type:String,
        default:"https://ik.imagekit.io/yuhb2zywe/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.webp"
    }
})

const userModel = mongoose.model("User",userSchema)
module.exports = userModel;