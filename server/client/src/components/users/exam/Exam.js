import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Top from './Top'
import Bottom from './Bottom'
import { getProblems, readProblems } from '../../../actions/problem'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { addAnswer, updateAnswer } from '../../../actions/answer'

const DisplayButton = ({ num = '', pageId, visited = '' }) => {

  const navigate = useNavigate()
  return (
    <>
      {
        visited ?
          <div className='border border-gray-600 bg-gray-400 text-white text-center items-center w-28 py-6 text-[32px] rounded-xl cursor-pointer mx-1.5 my-2' onClick={() => navigate(`/exam/${pageId}`)}>
            {num}
          </div>
          :
          <div className='border border-gray-600 text-gray-700 text-center items-center w-28 py-6 text-[32px] rounded-xl mx-1.5 my-2'>
            {num}
          </div>
      }

    </>
  )
}

const ChoiceButton = ({ name = '', content = '', answer = '', choice, setChoice }) => {
  const dispatch = useDispatch()
  const buttonClick = () => {
    if (choice === '') {
      setChoice(name)
      dispatch(addAnswer(name))
    }
    else {
      toast.error('You already chose an answer.')
    }
  }

  let text;
  if (name === 'choice1')
    text = 'A'
  else if (name === 'choice2')
    text = 'B'
  else if (name === 'choice3')
    text = 'C'
  else
    text = 'D'

  return (
    <>
      <div className='flex flex-row gap-10 items-center'>
        {
          choice === name ?
            choice === answer ?
              <div className='bg-[#4EFF6C] text-[32px] text-white px-5 py-10 rounded-xl cursor-pointer'>{text}</div>
              :
              <div className='bg-[#FF5353] text-[32px] text-white px-5 py-10 rounded-xl cursor-pointer'>{text}</div>
            :
            <div className='bg-[#3598DB] text-[32px] text-white px-5 py-10 rounded-xl cursor-pointer hover:bg-blue-300' onClick={buttonClick}>{text}</div>
        }
        <div className='text-gray-500 text-[32px]'>{content}</div>
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
  const answers = useSelector(state => state.answerReducer.answers)

  const name = useSelector(state => state.todoReducer.category)
  const testNum = useSelector(state => state.todoReducer.index)
  const [currentData, setCurrentData] = useState({})
  const [length, setLength] = useState()
  const [choice, setChoice] = useState('')

  useEffect(() => {
    if (name === 'todotest')
      dispatch(getProblems(testNum))
    else
      dispatch(readProblems(testNum, name))
  }, [])

  useEffect(() => {
    if (exams)
      setCurrentData(exams[id - 1])
    if (answers) {
      if (answers[id - 1]) {
        setChoice(answers[id - 1])
      }
      else
        setChoice('')
    }
    else
      setChoice('')
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
    let len = exams.length;
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
    if (choice === '') {
      toast.error('You should choose an answer.')
    }
    else {
      if (Number(id) !== length) {
        const next = Number(id) + 1
        navigate(`/exam/${next}`)
      }
      else (
        navigate('/exam/result')
      )
    }
  }

  return (
    <>
      <Top id={id} />
      <div className='h-full'>
        {
          currentData ?
            <>
              <div className='flex flex-row w-full h-screen -mt-16'>
                <div className='flex justify-center items-center w-1/2'>
                  <img className='px-20 py-40 min-w-[701px] w-[801px]' src={currentData.image} alt='test_image' />
                </div>
                <div className='flex flex-col justify-center gap-10 w-1/2 px-10'>
                  <div className='mt-20 text-[32px] text-gray-500'>
                    {currentData.title}
                  </div>
                  <ChoiceButton name='choice1' content={currentData.choice1} answer={currentData.answer} choice={choice} setChoice={setChoice} />
                  <ChoiceButton name='choice2' content={currentData.choice2} answer={currentData.answer} choice={choice} setChoice={setChoice} />
                  <ChoiceButton name='choice3' content={currentData.choice3} answer={currentData.answer} choice={choice} setChoice={setChoice} />
                  {
                    currentData.choice4 ?
                      <ChoiceButton name='choice4' content={currentData.choice4} answer={currentData.answer} choice={choice} setChoice={setChoice} />
                      :
                      <></>
                  }
                  <div className='flex flex-row py-10 gap-10 justify-center items-center'>
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
              <div className='px-5'>
                <div className='flex flex-row flex-wrap'>
                  {
                    rows.map((row, key) => {
                      return <DisplayButton num={row} pageId={key+1} visited={answers[key] ? true : false} key={key} />
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