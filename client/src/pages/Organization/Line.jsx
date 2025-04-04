import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useIsAuth } from '@/hooks/useIsAuth.js';
import LineList from '@/components/line/LineList';



const Line = () => {
  useIsAuth()
  return (
    <div className="flex p-3 shadow-lg mx-3 border border-gray-50 ">
      <main className="flex-1 overflow-auto bg-gray-50 ">
        < LineList />
      </main>
    </div>
  )
}

export default Line
