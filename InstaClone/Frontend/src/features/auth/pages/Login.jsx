import React from 'react'
import { Link } from 'react-router-dom'
import "../style/Style.scss"
import { useState } from 'react'
import axios from 'axios'
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    async function handleSubmit(e) {
        e.preventDefault();
        console.log({ username, password });
        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", { username, password }, { withCredentials: true })
            console.log(res.data);
        } catch (err) {
            console.log(err.response.data.message);
        }
        setUsername('')
        setPassword('')
    }
    return (
        <main>
            <div className="formContainer">
                <h1>Login</h1>
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <input onInput={(e) => setUsername(e.target.value)} type="text" name="username" placeholder=" Enter Username" value={username} />
                    <input onInput={(e) => setPassword(e.target.value)} type="password" name='password' placeholder=" Enter Password" value={password} />
                    <button type="submit">Login</button>
                    <p>Do you have an account? <Link className='toggle' to="/register">Register</Link></p>
                </form>
            </div>
        </main>
    )
}

export default Login