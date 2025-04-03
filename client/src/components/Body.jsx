import React from 'react'

import Login from '../pages/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorElement from './Errorelement'
import Contact from './Contact'
import Dashboard from '../pages/Dashboard'
const Body = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
            errorElement: <ErrorElement />
        },
        {
            path: "/contact",
            element: <Contact />,
            errorElement: <ErrorElement />
        },
        {
            path: '/dashboard',
            element: <Dashboard />
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default Body