// app.js creates the server and config the server 
const express = require("express")
const app = express();
app.use(express.json())
const notes = [];

app.post("/note",(req,res)=>{
    notes.push(req.body);
    console.log("Note created");
    res.send("Note created")
})
app.get("/note",(req,res)=>{
    res.send(notes)
})

app.delete("/note/:index",(req,res)=>{
    delete notes[req.params.index];
    res.send("Note deleted")
});

app.patch("/note/:index",(req,res)=>{
    notes[req.params.index].title = req.body.title;
    res.send("Note patch updated")
})
app.put("/note/:index",(req,res)=>{
    notes[req.params.index] = req.body;
    res.send("Note put updated")
})

module.exports = app;