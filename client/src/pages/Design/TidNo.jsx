import TidNoLIst from '@/components/TidNo/TidNoLIst'
import { useIsAuth } from '@/hooks/useIsAuth'
import React from 'react'

const TidNo = () => {
  useIsAuth()
  return (
    <div className="flex p-3 shadow-lg mx-3 border border-gray-50 overflow-x-hidden">
      <main className="flex-1 overflow-auto bg-gray-50 ">
        <TidNoLIst/>
      </main>
    </div>
  )
}

export default TidNo
