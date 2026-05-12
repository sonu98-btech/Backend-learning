const express = require("express");
const app = express();
app.use(express.json());
const notes = [];

app.post("/notes",(req,res)=>{
    notes.push(req.body);
    res.send("Note added successfully");

})

app.get("/notes",(req,res)=>{
    res.json(notes);
})

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index];
    res.send("Note deleted successfully");
})

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].title = req.body.title;
    res.send("Note updated successfully");
})
app.put("/notes/:index",(req,res)=>{
    notes[req.params.index] = req.body;
    res.send("Note updated successfully using put");
});
module.exports = app;