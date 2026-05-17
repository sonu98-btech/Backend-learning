const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,"Email already exists"]
    },
    password:String
});

const noteModel = mongoose.model("note",noteSchema);

module.exports = noteModel;