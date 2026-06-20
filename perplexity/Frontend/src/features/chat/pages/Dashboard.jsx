import React from 'react'
import { usechat } from '../hooks/usechat'
import { useEffect } from 'react'
const Dashboard = () => {
    const chat = usechat()
    useEffect(()=>{
        chat.initializeSocketConnection()
    },[])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard