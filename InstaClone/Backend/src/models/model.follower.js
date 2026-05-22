const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
    follower:{
        type:String,
        required:true
    },
    followee:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','accepted','rejected'],
        default:'pending'
    }
},{
    timestamps:true 
})
followerSchema.index({ follower: 1, followee: 1 }, { unique: true });

const followerModel = mongoose.model('follower',followerSchema);
module.exports = followerModel;