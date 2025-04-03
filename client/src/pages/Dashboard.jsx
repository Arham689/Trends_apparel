import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DepartmentLIst from '../components/DepartmentLIst'
const base_url = import.meta.env.VITE_BASE_API_URL
const Dashboard = () => {
  // const navigate = useNavigate()
  // useEffect( ()=>{
  //   const checkAuth = async () => {
  //     try {
  //         const res = await axios.get(`${base_url}/api/auth/protectedPage` ,{
  //           withCredentials : true
  //         });

  //         if (res.status === 401) {
  //           navigate('/');
  //         }
  //     } catch (err) {
  //         navigate('/');
  //     }
  // };

  // checkAuth()

  // },[navigate])

  return (
    <div className="flex h-screen">
      <h1 className=' text-2xl'> Dahsboard </h1>
    </div>
  )
}

export default Dashboard
