import MappingList from '@/components/OperationMapping/MappingList';
import withDynamicForm from '@/components/ui/WithDynamicForm';
import { useIsAuth } from '@/hooks/useIsAuth'
import React, { useState } from 'react'

const OperationMapping = () => {
  
  useIsAuth()
  return (
    <div className="flex p-3 shadow-lg mx-3 border border-gray-50 overflow-x-hidden">
      <main className="flex-1 overflow-auto bg-gray-50 ">
        <MappingList/> 
      </main>
    </div>
  )
}

export default OperationMapping
