import React from 'react'
import FormGroup from '../components/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/use.auth'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import "../style/auth.form.scss"
const Login = () => {
  const { loginHandler } = useAuth();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginHandler(username, email, password);
    navigate("/");
  }
  return (
    <main className='form-main'>
      <div className="formContainer">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <FormGroup value={username} onChange={(e) => setUsername(e.target.value)} label="Username" id="username" placeholder="Enter your username" />
          <FormGroup value={email} onChange={(e) => setEmail(e.target.value)} label="Email" id="email" placeholder="Enter your email" />
          <FormGroup value={password} onChange={(e) => setPassword(e.target.value)} label="Password" id="password" placeholder="Enter your password" type="password" />
          <button type='submit' className='button form-button'>Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </main>
  )
}

export default Login