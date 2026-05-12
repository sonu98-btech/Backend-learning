const mongoose = require("mongoose");
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
    }
});
const noteModel = mongoose.model("note", noteSchema);
module.exports = noteModel;
