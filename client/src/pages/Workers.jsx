import { WorkerList } from '@/components/Worker/WorkerList'
import { useIsAuth } from '@/hooks/useIsAuth'
import React from 'react'

const Workers = () => {
  useIsAuth()
  return (
    <div className="flex p-3 shadow-lg mx-3 border border-gray-50 overflow-x-hidden">
      <main className="flex-1 overflow-auto bg-gray-50 ">
        <WorkerList/>
      </main>
    </div>
  )
}

export default Workers
