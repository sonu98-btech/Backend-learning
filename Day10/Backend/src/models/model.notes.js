const mongoose=require("mongoose");

const noteSchema=new mongoose.Schema({
    name:String,
    email:{
        type : String,
        unique :[true,"email already exists"]
    },
    password:String
})
const noteModel = mongoose.model("note",noteSchema);
module.exports=noteModel;