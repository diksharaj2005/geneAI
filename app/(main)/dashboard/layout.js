import React, { Suspense } from 'react'
import { RingLoader } from 'react-spinners'

const Layout = ({children}) => {
  return (
    <div className='px-5'>
        <div className='flex items-center justify-between mb-5'>
            <h1 className='text-5xl font-bold bg-gradient-to-b from-gray-200 via-purple-300 to-gray-50 bg-clip-text text-transparent'>Industry Insights</h1>
        </div>
        <Suspense fallback={<RingLoader className='mt-4' width={"100%"} color='gray'/>}>{children}</Suspense>
        </div>
  )
}

export default Layout