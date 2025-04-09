
import React from 'react'
import Header from './Header'

import { Outlet } from 'react-router-dom'
import Sidebar from './SideBar'

const Layout = () => {
    return (
    <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 bg-gray-50 flex justify-center items-start overflow-y-auto">
            <div className="w-full max-w-[1400px] px-4">
              <Outlet />
            </div>
          </main>
        </div>
    </div>
    )
}

export default Layout
