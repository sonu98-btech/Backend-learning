const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default: ""
    },
    img:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }})
    const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;