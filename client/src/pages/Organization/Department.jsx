import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DepartmentLIst from '../../components/Department/DepartmentList'
import { useIsAuth } from '@/hooks/useIsAuth.js'
const base_url = import.meta.env.VITE_BASE_API_URL

const Department = () => {
  useIsAuth()
  return (
    <div className="flex p-3 shadow-lg mx-3 border border-gray-50 overflow-x-hidden">
      <main className="flex-1 overflow-auto bg-gray-50 ">
        <DepartmentLIst />
      </main>
    </div>
  )
}

export default Department
