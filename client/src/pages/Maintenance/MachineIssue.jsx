import MachineIssueList from '@/components/MachineIssue/MachineIssueList'
import React from 'react'

const MachineIssue = () => {
  return (<div className="flex p-3 shadow-lg mx-3 border border-gray-50 overflow-x-hidden">
    <main className="flex-1 overflow-auto bg-gray-50 ">
    {/* <DepartmentLIst /> */}
       <MachineIssueList/>
     </main>
 </div>
  )
}

export default MachineIssue
