import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBadge } from '../../../../apis/test.api'

const TabButton = ({ text = '', id = '', selectedTab, setSelectedTab }) => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate()

  const onClick = (e) => {
    setSelectedTab(e.target.id)
    navigate(`/user/${id}`)
  }

  const getCount = async () => {
    const res = await getBadge(id)
    setCount(res);
  }
  useEffect(() => {
    getCount();
  }, [selectedTab])

  return (
    <div className='flex flex-col text-center'>
      {
        count ?
          <div className='relative'>
            <div className='absolute float-right right-0 bg-[#26FF4A] -mt-2 -mr-3 text-white px-2 py-0.5'>{Number(count)}</div>
            <div className='py-4 px-2 bg-[#3598DB] w-48 text-base text-white rounded-sm uppercase cursor-pointer hover:bg-blue-400' id={id} onClick={onClick}>
              {text}
            </div>
          </div>
          :
          <div className='py-4 px-2 bg-[#3598DB] w-48 text-base text-white rounded-sm uppercase cursor-pointer hover:bg-blue-400' id={id} onClick={onClick}>
            {text}
          </div>
      }

      {
        selectedTab === id ? <div className='mt-3 h-0.5 w-48 bg-[#3598DB]' /> : <div className='mt-3 h-1 w-48 bg-[#3598DB] hidden' />
      }
    </div>
  )
}

export default TabButton