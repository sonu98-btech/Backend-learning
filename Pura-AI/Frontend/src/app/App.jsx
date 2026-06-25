import React from 'react'
import {RouterProvider} from 'react-router'
import { router } from './app.routes.jsx'
import { useEffect } from 'react'
import { useAuth } from '../features/auth/hooks/use.auth.js'
const App = () => {
  const { fetchCurrentUser } = useAuth();

  useEffect(() => {
    fetchCurrentUser();
}, []);
  return (
    <RouterProvider router={router} />
  )
}

export default App