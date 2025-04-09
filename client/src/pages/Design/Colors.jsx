import ColorList from '@/components/Color/ColorList'
import { useIsAuth } from '@/hooks/useIsAuth'
import React from 'react'

const Colors = () => {
  useIsAuth()
  return (
    <div>
       <div className="flex p-3 shadow-lg mx-3 border border-gray-50 overflow-x-hidden">
         <main className="flex-1 overflow-auto bg-gray-50 ">
         {/* <DepartmentLIst /> */}
          <ColorList/>
          </main>
      </div>
    </div>
  )
}

export default Colors
