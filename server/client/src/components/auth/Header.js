import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = ({ heading, paragraph, linkName, linkUrl }) => {
  const navigate = useNavigate()
  console.log(linkUrl)
  return (
    <div className='mb-10'>
      <div className='flex justify-center'>
        <img alt='' className='h-18 w-18' src='/assets/icons/logo.png' />
      </div>
      <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
        {heading}
      </h2>
      <div className='text-center text-sm text-gray-600 mt-5'>
        {paragraph} {' '}
        <span className='font-medium text-purple-600 hover:text-purple-500 cursor-pointer underline' onClick={() => navigate(`${linkUrl}`)}>
          {linkName}
        </span>
      </div>
    </div>
  )
}

export default Header