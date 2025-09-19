import { getAssessments } from '../../../actions/interview'
import React from 'react'
import StatsCards from './_components/statscards'
import PerformanceChart from './_components/performanceChart'
import QuizList from './_components/quizlist'

const interview = async() => {


  const assessments = await getAssessments()
  
  return (
    <div>
      <div>
        <h1 className='text-5xl font-bold bg-gradient-to-br from-gray-200 via-purple-300 to-gray-50 bg-clip-text text-transparent mb-5'>Interview Preparation</h1>




        <div className='space-y-8'>
          <StatsCards assessments = {assessments}/>
          <PerformanceChart assessments = {assessments}/>
          <QuizList assessments = {assessments}/>
        </div>
      </div>
    </div>
  )
}

export default interview