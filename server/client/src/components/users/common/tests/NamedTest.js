import React, { useState } from 'react'
import Modal from './Modal'

const NamedTest = props => {

  const [showModal, setShowModal] = useState(false)
  const onClick = () => {
    setShowModal(true)
  }
  let number;
  if (props.test.id < 10)
    number = props.name.slice(0, 1).toUpperCase() + `0${props.test.id}`
  else
    number = props.name.slice(0, 1).toUpperCase() + `${props.test.id}`
  return (
    <>
      <div className='flex flex-row items-center justify-between w-full mb-3 px-8 py-3 shadow-lg cursor-pointer' onClick={onClick}>
        <div className='bg-[#3598DB] text-white text-2xl py-3 w-14 rounded-md text-center'>{number}</div>
        <div className='text-normal  text-gray-600'>Test Oficiale de la DGT</div>
        <div className='flex flex-row space-x-2'>
          <div className='rounded-full border border-gray-400 w-4 h-4 bg-white' />
          <div className='rounded-full border border-gray-400 w-4 h-4 bg-white' />
          <div className='rounded-full border border-gray-400 w-4 h-4 bg-white' />
        </div>
        <div className='flex flex-row gap-3 items-center'>
          <div className='text-xl text-gray-500'>Dificultad</div>
          <div className='flex flex-row gap-1 items-center'>
            <img src='/assets/icons/star.png' alt='star' />
            <img src='/assets/icons/star.png' alt='star' />
            <img src='/assets/icons/star.png' alt='star' />
            <img src='/assets/icons/star2.png' alt='star' />
            <img src='/assets/icons/star2.png' alt='star' />
          </div>
        </div>
        <div className='flex'>
          {
            props.pending === true ?
              <>
                <img src='/assets/icons/redclock1.png' alt='clock1' />

              </>
              :
              <>
                <img src='/assets/icons/clock1.png' alt='clock1' />
              </>
          }
        </div>
        <div className="flex -space-x-2 w-32 overflow-hidden">
          {/* <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
          <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
        </div>
        <div className='bg-[#3598DB] py-3 px-7 rounded-xl text-center text-white'>
          Para hacer
        </div>

        <img src='/assets/icons/More.png' alt='more' />
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </>

  )
}

export default NamedTest