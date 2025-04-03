
import React from 'react'
import Header from './Header'

import { Outlet } from 'react-router-dom'
import Sidebar from './SideBar'

const Layout = ({ children }) => {
    return (
        <div>
            <div className="flex h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header />
                    <main className="flex-1 overflow-auto bg-gray-50">
                        {/* <DepartmentLIst /> */}
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Layout
