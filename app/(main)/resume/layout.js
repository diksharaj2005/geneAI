import React, { Suspense } from 'react'
import { RingLoader } from 'react-spinners'

const Layout = ({children}) => {
  return (
    <div className='px-5'>
       
        <Suspense fallback={<RingLoader className='mt-4 flex justify-center items-center' width={"100%"} color='gray'/>}>{children}</Suspense>
        </div>
  )
}

export default Layout