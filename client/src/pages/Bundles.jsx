import BundleList from '@/components/Bundle/BundleList'
import useFetch from '@/hooks/useFetch';
import { useIsAuth } from '@/hooks/useIsAuth'
import { flattenObject } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Tasks from './Tasks';
const base_url = import.meta.env.VITE_BASE_API_URL

const Bundles = () => {
  const navigate = useNavigate() 

  useIsAuth()
  return (
    <div className="flex p-3 shadow-lg mx-3 border border-gray-50 overflow-x-hidden">
      <main className="flex-1 overflow-auto bg-gray-50 ">
        <div className=' flex  justify-between '>
          <h1 className='p-2 text-xl font-light '>Bundle List </h1>
          <button className='bg-primary text-white py-2 px-2 rounded-lg active:bg-indigo-500 ' onClick={()=>{navigate('/bundel/create')}}>Add New Bundle </button>
        </div>
        <BundleList  />
      </main>
    </div>
  )
}

export default Bundles
