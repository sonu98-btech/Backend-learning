import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Home from "./features/home/pages/home";
import { createBrowserRouter } from "react-router";
import Protected from "./features/auth/components/Protected";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Protected>
                <Home />
            </Protected>
        ),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);