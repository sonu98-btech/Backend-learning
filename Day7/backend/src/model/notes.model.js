const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
    title : String,
    description : String,
})
const notesModel = mongoose.model("note",notesSchema)
module.exports = notesModel