import React, { useState } from 'react'
import Modal from './Modal'
import toast from 'react-hot-toast'

const TodoTest = props => {
  const [showModal, setShowModal] = useState(false)
  let number
  if (props.test.no < 10)
    number = '0' + props.test.no
  else
    number = '' + props.test.no
  const onClick = () => {
    setShowModal(true)
  }

  const onDetailClick = (e) => {
    e.stopPropagation()
    toast.success('details')
  }
  return (
    <>
      <div className='flex flex-row items-center justify-between w-full mb-3 px-8 py-4 shadow-md cursor-pointer hover:shadow-xl hover:bg-gray-50' onClick={onClick}>
        <div className='bg-[#3598DB] text-white text-2xl py-3 w-14 rounded-md text-center'>{number}</div>
        <div className='text-normal  text-gray-600'>Test Oficiale de la DGT</div>
        <div className='flex flex-row space-x-2'>
          <div className='rounded-full border border-gray-400 w-4 h-4 bg-white' />
          <div className='rounded-full border border-gray-400 w-4 h-4 bg-white' />
          <div className='rounded-full border border-gray-400 w-4 h-4 bg-white' />
        </div>
        <div className='flex space-x-3 text-gray-600'>
          <div className='text-normal'>Quedan</div>
          <div className='text-normal'>00:00:00</div>
        </div>
        <div className='flex'>

          <img src='/assets/icons/clock1.png' alt='clock1' />

        </div>
        <div className="flex -space-x-2 overflow-hidden">
          <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
          <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
        </div>

        <div className='bg-[#3598DB] py-3 px-7 rounded-xl text-center text-white'>
          Para hacer
        </div>

        <img className='cursor-pointer' src='/assets/icons/More.png' alt='more' onClick={onDetailClick}/>
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} id={props.test.no} count = {props.test.count} name='todotest'/>
    </>
  )
}

export default TodoTest


  // <>
  //     <div className='flex flex-row items-center justify-between w-full mb-3 px-8 py-3 shadow-lg cursor-pointer' onClick={onClick}>
  //       <div className='bg-[#3598DB] text-white text-2xl py-3 w-14 rounded-md text-center'>{num}</div>
  //       <div className='text-normal  text-gray-600'>Test Oficiale de la DGT</div>
  //       <div className='flex flex-row space-x-2'>
  //         {
  //           pending === true ?
  //             <>
  //               <div className='rounded-full w-4 h-4 bg-red-500' />
  //               <div className='rounded-full border border-gray-400 w-4 h-4 bg-white' />
  //               <div className='rounded-full border border-gray-400 w-4 h-4 bg-white' />
  //             </>
  //             :
  //             <>
  //               <div className='rounded-full w-4 h-4 bg-red-500' />
  //               <div className='rounded-full w-4 h-4 bg-orange-500' />
  //               <div className='rounded-full w-4 h-4 bg-green-500' />
  //             </>
  //         }
  //       </div>
  //       <div className='flex space-x-3 text-gray-600'>
  //         <div className='text-normal'>Quedan</div>
  //         <div className='text-normal'>{timeLeft}</div>
  //       </div>
  //       <div className='flex'>
  //         {
  //           pending === true ?
  //             <>
  //               <img src='/assets/icons/redclock1.png' alt='clock1' />

  //             </>
  //             :
  //             <>
  //               <img src='/assets/icons/clock1.png' alt='clock1' />
  //             </>
  //         }
  //       </div>
  //       <div className="flex -space-x-2 overflow-hidden">
  //         <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
  //         <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
  //         <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
  //         <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
  //         <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
  //       </div>
  //       {
  //         pending === true ?
  //           <>
  //             <div className='flex bg-[#FFEBCCFC] space-x-2 py-3 px-4 rounded-xl'>
  //               <div className='flex w-6 h-6 bg-orange-400 rounded-full justify-center items-center'>
  //                 <img src='/assets/icons/vector.png' alt='complete' />
  //               </div>
  //               <div className='text-sm text-orange-300 font-bold'>Pendiente</div>
  //             </div>
  //           </>
  //           :
  //           <>
  //             <div className='flex bg-[#CBF9D4FC] space-x-2 py-3 px-4 rounded-xl'>
  //               <img src='/assets/icons/complete.png' alt='complete' />
  //               <div className='text-sm text-green-400 font-bold'>Completed</div>
  //             </div>
  //           </>
  //       }

  //       <img src='/assets/icons/More.png' alt='more' />
  //     </div>
  //     <Modal showModal={showModal} setShowModal={setShowModal} />
  //   </>