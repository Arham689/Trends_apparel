import GarmentList from '@/components/Garment/GarmentList'
import { useIsAuth } from '@/hooks/useIsAuth'
import React from 'react'

const GarmentsCode = () => {
  useIsAuth()
  return (
    <div className="flex p-3 shadow-lg mx-3 border border-gray-50 overflow-x-hidden">
      <main className="flex-1 overflow-auto bg-gray-50 ">
        <GarmentList/>
      </main>
    </div>
  )
}

export default GarmentsCode
