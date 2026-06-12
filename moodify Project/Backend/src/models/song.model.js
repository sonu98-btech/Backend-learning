const mongoose = require("mongoose")

const songSchema = new mongoose.Schema({
   AudioUrl:{
    type:String,
    required:true
   },
   PosterUrl:{
    type:String,
    required:true
   },
   title:{
    type:String,
    required:true
   },
   mood:{
    type:String,
    required:true
   }
})

const songModel = mongoose.model("song",songSchema)
module.exports = songModel
