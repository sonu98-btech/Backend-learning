import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

export const register = async (username, email, password) => {
    try {
        const response = await api.post("api/auth/register", {
        username,
        email,
        password
    })
    } catch (error) {
        console.error(err);

    return res.status(500).json({
        message: err.message
    });
    }
    return response.data
}

export const login = async (email, password) => {
    const response = await api.post("api/auth/login", {
        email,
        password
    })
    return response.data
}
export const getMe = async () => {  
    const response = await api.get("api/auth/get-me")
    return response.data
}

export const logout = async()=>{
    const response = await api.post('api/auth/logout')
    return response.data
}