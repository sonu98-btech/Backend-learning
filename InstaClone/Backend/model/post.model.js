const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default: ''
    },
    imgUrl:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

},{
    timestamps: true
})
const postModel = mongoose.model('post', postSchema);
module.exports = postModel;