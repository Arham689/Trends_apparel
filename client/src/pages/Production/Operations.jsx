import OperationList from '@/components/Operation/OperationList'
import { useIsAuth } from '@/hooks/useIsAuth'
import React from 'react'

const Operations = () => {
  useIsAuth()
  return (
    <div className="flex p-3 shadow-lg mx-3 border border-gray-50 overflow-x-hidden">
      <main className="flex-1 overflow-auto bg-gray-50 ">
        <OperationList/>
      </main>
    </div>
  )
}

export default Operations
