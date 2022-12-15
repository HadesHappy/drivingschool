import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import toast from 'react-hot-toast'
import { setIndex } from '../../../../actions/test'
import { useDispatch } from 'react-redux'

const StatusCircle = ({ result = {} }) => {
  return (
    <>
      {
        result.isPass ?
          result.type === 'exam' ?
            <div className='rounded-full w-4 h-4 bg-green-500' />
            :
            <div className='rounded-full w-4 h-4 bg-yellow-500' />
          :
          <div className='rounded-full w-4 h-4 bg-red-500' />
      }
    </>
  )
}

const TodoTest = ({ test = '', no = '' }) => {
  const [showModal, setShowModal] = useState(false)
  const dispatch = useDispatch()
  let imageString;
  let statusString;

  const calculateEnabled = () => {
    if (test.latestTime) {
      let difference = -(new Date(test.latestTime) - new Date());
      if (difference > 24 * 60 * 60 * 1000)
        return true
      else
        return false
    }
    else {
      return true
    }
  }

  const [enabled, setEnabled] = useState(calculateEnabled())

  const calculateTimeLeft = () => {
    if (enabled)
      clearTimeout()
    if (test.latestTime) {
      if (!enabled) {
        let difference = -(new Date(test.latestTime) - new Date());
        if (difference < 24 * 60 * 60 * 1000) {
          difference = 24 * 60 * 60 * 1000 - difference
          let timeLeft = {};
          if (difference > 0) {
            timeLeft = {
              days: Math.floor(difference / (1000 * 60 * 60 * 24)),
              hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60)
            };
          }
          return timeLeft;
        }

        else {
          setEnabled(true)
          clearTimeout()
          return 0
        }
      }
    }
    else {
      return 0
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const onClick = () => {
    if (enabled) {
      dispatch(setIndex(test.id))
      setShowModal(true)
    }
    else {
      toast.error(`You should wait ${display(timeLeft.hours)} hours and ${display(timeLeft.minutes)} minutes.`)
    }
  }

  const display = (num) => {
    if (num < 10)
      return '0' + num
    else
      return num
  }
  const onDetailClick = (e) => {
    e.stopPropagation()
    toast.success('details')
  }

  if (test.images) {
    if (test.images.length > 5) {
      let subImages = []
      for (let i = 0; i < 4; i++)
        subImages.push(test.images[i])

      const extraNum = test.images.length - 4
      imageString = (<>
        {subImages.map((image, key) =>
          <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white" src={image} alt="" key={key} />)}
        <div className='flex h-7 w-7 rounded-full ring-2 ring-white bg-[#3598DB] text-white font-medium text-center justify-center items-center'>{extraNum}+</div>
      </>)
    }
  }

  if (test.results) {
    const resultLen = test.results.length
    if (resultLen === 3) {
      statusString = (
        <>
          <StatusCircle result={test.results[2]} />
          <StatusCircle result={test.results[1]} />
          <StatusCircle result={test.results[0]} />
        </>
      )
    }
    else if (resultLen === 2) {
      statusString = (
        <>
          <StatusCircle result={test.results[1]} />
          <StatusCircle result={test.results[0]} />
          <div className='rounded-full border border-gray-400 w-4 h-4 bg-white' />
        </>
      )
    }
    else {
      statusString = (
        <>
          <StatusCircle result={test.results[0]} />
          <div className='rounded-full border border-gray-400 w-4 h-4 bg-white' />
          <div className='rounded-full border border-gray-400 w-4 h-4 bg-white' />
        </>
      )
    }
  }

  return (
    <>
      <div className='flex flex-row items-center justify-between w-full mb-3 px-8 py-4 shadow-md cursor-pointer hover:shadow-xl hover:bg-gray-50' onClick={onClick}>
        <div className='bg-[#3598DB] text-white text-2xl py-3 w-14 rounded-md text-center'>{display(no)}</div>
        <div className='text-normal  text-gray-600'>Test Oficiale de la DGT</div>
        <div className='flex flex-row space-x-2'>
          {
            test.results ?
              statusString
              :
              <>
                <div className='rounded-full border border-gray-400 w-4 h-4 bg-white' />
                <div className='rounded-full border border-gray-400 w-4 h-4 bg-white' />
                <div className='rounded-full border border-gray-400 w-4 h-4 bg-white' />
              </>

          }
        </div>
        <div className='flex space-x-3 text-gray-600 min-w-[150px]'>
          <div className='text-normal'>Quedan</div>
          {
            enabled ?
              <div className='text-normal'>00:00:00</div>
              :
              <div className='text-normal'>{display(timeLeft.hours)}:{display(timeLeft.minutes)}:{display(timeLeft.seconds)}</div>
          }
        </div>
        <div className='flex'>
          {
            enabled ?
              <img src='/assets/icons/clock1.png' alt='clock1' />
              :
              <img src='/assets/icons/redclock1.png' alt='redclock1' />
          }
        </div>
        <div className="flex -space-x-2 overflow-hidden min-w-[150px]">
          {
            test.images ?
              test.images.length > 5 ?
                imageString
                :
                test.images.map((image, key) =>
                  <img className="inline-block h-7 w-7 rounded-full ring-2 ring-white" src={image} alt="" key={key} />)
              : <></>
          }
        </div>

        {
          test.results && test.results[0].isPass ?
            <div className='flex bg-[#CBF9D4FC] space-x-2 py-3 px-4 rounded-xl'>
              <img src='/assets/icons/complete.png' alt='complete' />
              <div className='text-sm text-green-400 font-bold'>Completed</div>
            </div>
            :
            enabled ?
              <div className='bg-[#3598DB] py-3 px-7 rounded-xl text-center text-white'>
                Para hacer
              </div>
              :
              <div className='flex bg-[#FFEBCCFC] space-x-2 py-3 px-4 rounded-xl'>
                <div className='flex w-6 h-6 bg-orange-400 rounded-full justify-center items-center'>
                  <img src='/assets/icons/Vector1.png' alt='complete' />
                </div>
                <div className='text-sm text-orange-300 font-bold'>Pendiente</div>
              </div>
        }
        <img className='cursor-pointer' src='/assets/icons/More.png' alt='more' onClick={onDetailClick} />
      </div>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}

export default TodoTest
