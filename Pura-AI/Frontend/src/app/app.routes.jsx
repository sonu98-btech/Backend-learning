import { createBrowserRouter } from 'react-router'
import Login from '../features/auth/pages/Login.jsx'
import Register from '../features/auth/pages/Register.jsx'
import EmailVerification from '../features/auth/pages/EmailVerification.jsx'
import Protected from '../features/auth/components/Protected.jsx'
import Dashboard from '../features/chat/pages/Dashboard.jsx'

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/verify-email",
        element: <EmailVerification />
    },
    {
        path: "/",
        element: <Protected><Dashboard /></Protected>
    }
])