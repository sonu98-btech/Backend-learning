const mongoose = require('mongoose');

const postSchema =  new mongoose.Schema({
    caption:{
        type:String,
        default:''
    },
    img:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }

})

const postModel =  mongoose.model('post',postSchema);
module.exports = postModel;