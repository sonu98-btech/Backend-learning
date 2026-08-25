import { useState ,useEffect} from 'react'
import axios from "axios"
import './App.css'

function App() {
  const [users, setusers] = useState([])

  useEffect(() => {
    axios.get("/api/users",{withCredentials: true})
      .then((response) => {
        console.log(response.data.data);
        setusers(response.data.data);
      })
  }, []);

   return(
    <>
    {users.map((user) => (
      <div key={user.id}>
        <h2>{user.name}</h2>
      </div>
    ))}
    </>
   )
  
}

export default App
