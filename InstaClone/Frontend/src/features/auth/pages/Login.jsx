import React from 'react'
import "./style/form.scss"
import  {Link} from 'react-router'
import {useState} from 'react'
import {useAuth} from '../hooks/useAuth'
import { useNavigate } from 'react-router'
const Login =  () => {
    const {handleLogin,user,loading} = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
     await handleLogin(username,password);
     navigate("/");

    };
    if(loading) return <h1>Loading...</h1>
  return (
    <main>
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input onInput={(e)=>{setUsername(e.target.value)}} type="text" placeholder="Username" name='Username' />
                <input onInput={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Password" name='Password' />
                <button className="button Primary-button" type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Sign up.</Link></p>
        </div>
    </main>
  )
}

export default Login