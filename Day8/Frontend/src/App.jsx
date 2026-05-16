import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';

const App = () => {
  const [notes, setNotes] = useState([
    {
      title: 'First Note',
      description: 'This is the first note'
    },
    {
      title: 'Second Note',
      description: 'This is the second note'
    },
    {
      title: 'Third Note',
      description: 'This is the third note'
    },
    {
      title: 'Fourth Note',
      description: 'This is the fourth note'
    }
  ])
   console.log("okoko");
  function fetchNotes(){
    axios.get("http://localhost:3000/api/notes")
  .then(res=>{
    setNotes(res.data.notes);
  })}
   
  useEffect(()=>{
    fetchNotes();
  },[])
  function handleform(e){
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    axios.post("http://localhost:3000/api/notes",{
      title,
      description
    }).then(res=>{
    fetchNotes();
  })}
  function handleDelete(id){
    axios.delete("http://localhost:3000/api/notes/" + id)
    .then(res=>{
    fetchNotes();
  })
  }
  function handleUpdate(id){
    const title = prompt("Enter new title");
    const description = prompt("Enter new description");
    axios.put("http://localhost:3000/api/notes/" + id,{
      title,
      description
    }).then(res=>{
    fetchNotes();
  })
  }
    
  return (
    <> <form onSubmit={(e)=>handleform(e)} className='form'>
      <input type="text" placeholder='Enter title' name = "title" />
      <input type="text" placeholder='Enter description' name = "description"/>
      <button >submit</button>
    </form>
    <div className = "notes">
      {notes.map((note, index) => {
        return <div key={index} className="note">
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <div className="button">
            <button onClick={() => handleDelete(note._id)}>delete</button>
            <button onClick={() => handleUpdate(note._id)}>update</button>
          </div>
        </div>
      })}
    </div>
    </>
  )
}

export default App