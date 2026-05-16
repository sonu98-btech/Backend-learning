const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(cors());
app.use(express.json());
app.use(express.static("./public")); // Serve static files from the "public" directory publicly accessible
const noteModel  = require("./model/note.model");

app.get("/api/notes", async (req, res) => {
    const notes = await noteModel.find();
    res.status(200).json({
        message: "Notes fetched successfully",
         notes
    });
})
app.post("/api/notes",  async(req,res)=>{
    const {title, description} = req.body;
    const note = await noteModel.create({
        title,
        description

    })
    res.status(201).json({
        message: "Note created successfully",
        note
    })
})
app.delete("/api/notes/:id", async (req, res) => {
    const { id } = req.params;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message: "Note deleted successfully"
    });
});

app.patch("/api/notes/:id", async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const note = await noteModel.findByIdAndUpdate(id, { title });
    res.status(200).json({
        message: "Note updated successfully",
        note
    });
});

app.use("*name", (req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})
module.exports = app;