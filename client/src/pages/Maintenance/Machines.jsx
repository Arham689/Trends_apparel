import React from 'react'
import MachineList from '@/components/Machine/MachineList'
import { useIsAuth } from '@/hooks/useIsAuth'
const Machines = () => {
  useIsAuth()
  return (
    <div>
      <div className="flex p-3 shadow-lg mx-3 border border-gray-50 overflow-x-hidden">
         <main className="flex-1 overflow-auto bg-gray-50 ">
         {/* <DepartmentLIst /> */}
            <MachineList/>
          </main>
      </div>
    </div>
  )
}

export default Machines
