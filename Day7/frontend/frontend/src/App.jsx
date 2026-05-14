import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])

  axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
    setNotes(res.data.notes)
  })

  return (
    <div>
      <div className="notes">
        {notes.map((note, index) => (
          <div className="note" key={`${note.title}-${index}`}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App