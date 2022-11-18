import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Top from './Top'
import Bottom from './Bottom'
import { getProblems, readProblems } from '../../../actions/problem'
import { useSelector, useDispatch } from 'react-redux'

const DisplayButton = ({ num = '' }) => {
  return (
    <>
      <div className='border border-gray-600 bg-gray-400 text-white text-center items-center w-28 py-6 text-[32px] rounded-xl cursor-pointer'>
        {num}
      </div>
    </>
  )
}

const Exam = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const exams = useSelector(state => state.problemReducer.problems)
  const loading = useSelector(state => state.problemReducer.loading)
  const [currentData, setCurrentData] = useState({})
  const [length, setLength] = useState()

  const location = useLocation()

  useEffect(() => {
    const name = location.state.name
    const test_num = location.state.test_num
    if (name === 'todotest')
      dispatch(getProblems(test_num))
    else
      dispatch(readProblems(test_num, name))
  }, [])

  useEffect(() => {
    if (exams)
      setCurrentData(exams[id - 1])
  }, [id])

  useEffect(() => {
    if (exams) {
      setCurrentData(exams[id - 1])
      setLength(exams.length)
    }
  }, [loading])

  let rows = [];
  function Rows() {
    let i = 0
    let len = 15;
    while (++i <= len) rows.push(i);
  }
  Rows()

  const onPreviousClick = () => {
    if (Number(id) !== 1) {
      const previous = Number(id) - 1
      navigate(`/exam/${previous}`)
    }
  }
  const onNextClick = () => {
    if (Number(id) !== length) {
      const next = Number(id) + 1
      navigate(`/exam/${next}`)
    }
    else (
      navigate('/exam/result')
    )
  }
  return (
    <>
      <Top id={id} />
      <div>
        {
          currentData ?
            <>
              <div className='flex flex-row w-full'>
                <div className='flex justify-center items-center w-1/2'>
                  <img className='px-20 py-40' src={currentData.image} alt='test_image' />
                </div>
                <div className='flex flex-col gap-10 w-1/2 px-10'>
                  <div className='mt-20 text-[32px] text-gray-500'>
                    {currentData.title}
                  </div>
                  {
                    currentData.choices ?
                      <>
                        <div className='flex flex-row gap-10 items-center'>
                          <div className='bg-[#3598DB] text-[32px] text-white px-5 py-10 rounded-xl cursor-pointer hover:bg-blue-300'>A</div>
                          <div className='text-gray-500 text-[32px]'>{currentData.choices[0]}</div>
                        </div>
                        <div className='flex flex-row gap-10 items-center'>
                          <div className='bg-[#3598DB] text-[32px] text-white px-5 py-10 rounded-xl cursor-pointer hover:bg-blue-300'>B</div>
                          <div className='text-gray-500 text-[32px]'>{currentData.choices[1]}</div>
                        </div>
                        <div className='flex flex-row gap-10 items-center'>
                          <div className='bg-[#3598DB] text-[32px] text-white px-5 py-10 rounded-xl cursor-pointer hover:bg-blue-300'>C</div>
                          <div className='text-gray-500 text-[32px]'>{currentData.choices[2]}</div>
                        </div>
                        {
                          currentData.choices[3] ?
                            <div className='flex flex-row gap-10 items-center'>
                              <div className='bg-[#3598DB] text-[32px] text-white px-5 py-10 rounded-xl cursor-pointer hover:bg-blue-300'>D</div>
                              <div className='text-gray-500 text-[32px]'>{currentData.choices[3]}</div>
                            </div> : <></>
                        }
                      </>
                      : <></>
                  }
                  <div className='flex flex-row gap-10 justify-center items-center'>
                    <div className='flex flex-row rounded-xl px-10 py-5 items-center gap-5 text-white bg-[#3598DB] cursor-pointer hover:bg-blue-300' onClick={onPreviousClick}>
                      <FaChevronLeft />
                      <div className='uppercase'>anterior</div>
                    </div>
                    <div className='flex flex-row rounded-xl px-10 py-5 items-center gap-5 text-white bg-[#3598DB] cursor-pointer hover:bg-blue-300' onClick={onNextClick}>
                      <div className='uppercase'>siguiente</div>
                      <FaChevronRight />
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-20 flex flex-col space-y-10'>
                <div className='flex flex-row px-5 justify-between'>
                  {
                    rows.map((row, key) => {
                      return <DisplayButton num={row} key={key} />
                    })
                  }
                </div>
                <div className='flex flex-row px-5 justify-between'>
                  {
                    rows.map((row, key) => {
                      return <DisplayButton num={row + 15} key={key} />
                    })
                  }
                </div>
              </div>
            </>
            : <></>
        }

        <Bottom />
      </div>
    </>
  )
}

export default Exam