import axios from "axios"

const api = axios.create({
    baseURL:"/api/song",
    withCredentials:true
})

export const  getSong = async({mood})=>{
    const response = await api.get("/?mood=" +mood)
    return response.data
}