
import React from 'react'
import Header from './Header'

import { Outlet } from 'react-router-dom'
import Sidebar from './SideBar'
import { Toaster } from './ui/toaster'

const Layout = () => {
    return (
    <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden ">
          <div className='shadow-[0px_0px_20px_10px_rgba(0,_0,_0,_0.1)] rounded-lg m-3'>
            <Header />
          </div>
          <main className="flex-1 bg-gray-50 flex justify-center items-start overflow-y-auto">
            <div className="w-full max-w-[1400px] px-4">
              <Outlet />
            </div>
          </main>
        </div>
        <Toaster />
    </div>
    )
}

export default Layout
