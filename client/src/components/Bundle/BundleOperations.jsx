import React, { useState } from 'react'

const BundleOperations = ({bundleOperations}) => {

  return (
    <div>
        <div className='flex flex-col gap-2 text-gray-400 '>
        {bundleOperations.map((i , ind )=>{
          return (
            <div className='border-gray-300 border rounded-lg py-2 px-4 '>
             <span>{ind+1}</span><span> {i.operationName}</span>
            </div>
          )
        })}
        </div>

    </div>
  )
}

export default BundleOperations
