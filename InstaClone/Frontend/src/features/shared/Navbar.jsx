import React from 'react'
import "./navbar.scss"
import { useNavigate } from 'react-router'
const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className="nav-bar">
        <p>InstaClone</p>
        <button onClick={() => navigate('/create-post')}>Create Post</button>
    </div>
  )
}

export default Navbar