const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    }
},{
    timestamps:true
})
likeSchema.index({ postId: 1, userId: 1 }, { unique: true });

const likeModel = mongoose.model('like',likeSchema);
module.exports = likeModel;