import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import "../style/Style.scss"
const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    async function handleSubmit(e) {
        e.preventDefault();

        console.log({ username, password, email });

        try {
            const res = await axios.post(
                "http://localhost:3000/api/auth/register",
                { username, password, email },
                { withCredentials: true }
            );

            console.log(res.data);

        } catch (err) {
            console.log(err.response.data.message);
        }
        setUsername('')
        setEmail('')
        setPassword('')
    }
    return (
        <main>
            <div className="formContainer">
                <h1>Register</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input onInput={(e) => setUsername(e.target.value)} type="text" name="username" placeholder="Enter Username" value={username} />
                    <input onInput={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="Enter Email" value={email} />
                    <input onInput={(e) => setPassword(e.target.value)} type="password" name='password' placeholder="Enter Password" value={password} />
                    <button >Register</button>
                    <p>Don't have an account? <Link className='toggle' to="/login">Login</Link></p>
                </form>
            </div>
        </main>
    )
}

export default Register