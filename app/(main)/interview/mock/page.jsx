import { Button } from '../../../../components/ui/button'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import Quiz from '../_components/quiz'

const mock = () => {
  return (
    <div className='container mx-auto space-y-4 py-6'>
      <div className='flex flex-col space-y-2 mx-2'>
        <Link href={'/interview'}>
          <Button variant='link' className='gap-2 pl-0'>
            <ArrowLeft className='w-4 h-4' />
            Back to Interview Preparation
          </Button>
        </Link>


        <div>
          <h1 className='text-5xl font-bold bg-gradient-to-br from-gray-200 via-purple-300 to-gray-50 bg-clip-text text-transparent'>Mock Interview</h1>
          <p className='text-muted-foreground'>Test your knowledge with industry-specific questions</p>
        </div>



      </div>



      <Quiz />
    </div>
  )
}

export default mock