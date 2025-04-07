import SectionList from '@/components/Section/SectionList.jsx'
import { useIsAuth } from '@/hooks/useIsAuth.js'
import React from 'react'

const Section = () => {
  useIsAuth()
  return (
    <div>
      <div className="flex p-3 shadow-lg mx-3 border border-gray-50 ">
      <main className="flex-1 overflow-auto bg-gray-50 ">
        <SectionList/>
      </main>
    </div>
    </div>
  )
}

export default Section
