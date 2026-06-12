import { useState } from 'react'
import "./features/shared/style/global.scss"
import FaceExpression from './features/expression/components/Expression.jsx'
import { RouterProvider } from 'react-router'
import {router} from './app.routes'
import { AuthProvider } from './features/auth/auth.context.jsx'
import { SongContextProvider } from './features/home/home.context.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <SongContextProvider>
      <RouterProvider router={router}/>
      </SongContextProvider>
    </AuthProvider>
  )
  
}

export default App
