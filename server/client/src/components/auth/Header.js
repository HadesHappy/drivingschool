import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = ({ paragraph, linkName, linkUrl }) => {
  const navigate = useNavigate()
  return (
    <div className='mb-10'>
      <div className='flex justify-center'>
        <img alt='' className='h-32 w-32' src='/assets/icons/logo.png' />
      </div>
      {/* <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
        {heading}
      </h2> */}
      <div className='text-center text-sm text-gray-600 mt-5'>
        {paragraph} {' '}
        <span className='font-medium text-blue-600 hover:text-blue-500 cursor-pointer underline' onClick={() => navigate(`${linkUrl}`)}>
          {linkName}
        </span>
      </div>
    </div>
  )
}

export default Header