import React from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router'
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { handleRegister, loading, user } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(username, email, password);
    navigate('/');

  };
  if (loading) return <h1>Loading...</h1>

  return (
    <main>
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" name='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" name='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" name='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="button Primary-button" type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login.</Link></p>
      </div>
    </main>
  )
}


export default Register