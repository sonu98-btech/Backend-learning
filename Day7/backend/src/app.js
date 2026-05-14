const express = require('express')
const notesModel = require("./model/notes.model")
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

app.post("/api/notes", async (req, res)=>{
    const title = req.body.title
    const description = req.body.description
    const notes = await notesModel.create({ title, description })
    res.status(201).json({
        message : "Note created successfully",
        notes
    })

})

app.get("/api/notes", async(req, res)=>{
   const notes = await notesModel.find()
   res.status(200).json({
    message : "Notes fetched successfully",
    notes
   })
})

app.delete("/api/notes/:id", async (req, res)=>{
    const { id } = req.params
     await notesModel.findByIdAndDelete(id)
    res.status(200).json({
        message : "Note deleted successfully"
    })
})

app.patch("/api/notes/:id", async (req, res)=>{
    const { id } = req.params
    const {  description } = req.body
    const notes = await notesModel.findByIdAndUpdate(id, {  description }, { new: true })
    res.status(200).json({
        message : "Note updated successfully",
        notes
    })
})
module.exports = app