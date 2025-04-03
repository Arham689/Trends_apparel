import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DepartmentLIst from '../components/DepartmentList'
const base_url = import.meta.env.VITE_BASE_API_URL 
const Department = () => {
  const navigate = useNavigate()
  useEffect( ()=>{
    const checkAuth = async () => {
      try {
          const res = await axios.get(`${base_url}/api/auth/protectedPage` ,{
            withCredentials : true
          });

          if (res.status === 401) {
            navigate('/');
          }
      } catch (err) {
          navigate('/');
      }
  };

  checkAuth()

  },[navigate])

  return (
    <div className="flex p-3 shadow-lg mx-3 border border-gray-50 ">
        <main className="flex-1 overflow-auto bg-gray-50">
        <DepartmentLIst/>  
      </main>
      </div>
  )
}

export default Department
