import StyleList from '@/components/Style/StyleList'
import { useIsAuth } from '@/hooks/useIsAuth'
import React from 'react'

const Styles = () => {
    useIsAuth()
  return (
    <div className="flex p-3 shadow-lg mx-3 border border-gray-50 overflow-x-hidden">
      <main className="flex-1 overflow-auto bg-gray-50 ">
          <StyleList/>
      </main>
    </div>
  )
}

export default Styles
