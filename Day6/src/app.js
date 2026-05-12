const express = require("express")
const noteModel = require("./models/note.models")
const app = express()
app.use(express.json())

app.post("/notes", async (req,res)=>{
    const {title, description} = req.body
    const note = await noteModel.create({
        title,
        description
    }
    )
    res.status(201).json({
        message : "Note created successfully",
        note
    })
})

app.get("/notes", async (req,res)=>{
    const notes = await noteModel.find() // find() always return an array   
    res.status(200).json({
        message : "Notes fetched successfully",
        notes
    })})



module.exports= app;