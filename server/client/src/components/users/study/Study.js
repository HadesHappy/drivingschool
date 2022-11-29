import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Top from '../exam/Top'
import Bottom from '../exam/Bottom'
import { getProblems, readProblems } from '../../../actions/problem'
import { useSelector, useDispatch } from 'react-redux'
import { CHEATNUM } from '../../../utils/constants'
import toast from 'react-hot-toast'
import { addAnswer, increaseCheatNum } from '../../../actions/answer'

const DisplayButton = ({ num = '', pageId, visited = '', correct = '' }) => {

  const navigate = useNavigate()

  return (
    <>
      {
        !visited ?
          <div className='border border-gray-600 text-gray-700 text-center items-center w-28 py-6 text-[32px] rounded-xl mx-1.5 my-2'>
            {num}
          </div>
          :
          correct ?
            <div className='border border-gray-600 bg-[#4EFF6C] text-white text-center items-center w-28 py-6 text-[32px] rounded-xl mx-1.5 my-2 cursor-pointer' onClick={() => navigate(`/study/${pageId}`)}>
              {num}
            </div>
            :
            <div className='border border-gray-600 bg-[#FF5353] text-white text-center items-center w-28 py-6 text-[32px] rounded-xl mx-1.5 my-2 cursor-pointer' onClick={() => navigate(`/study/${pageId}`)}>
              {num}
            </div>
      }
    </>
  )
}

const StudyButton = ({ name = '', onClick, checked }) => {
  return (
    <>
      {
        checked ?
          <div className='border border-solid rounded-3xl border-[#3598DB] bg-[#3598DB] text-white py-1 w-44 text-center text-[12px] uppercase cursor-pointer font-bold' onClick={onClick}>
            {name}
          </div >
          :
          <div className='border border-solid rounded-3xl border-[#3598DB] text-[#3598DB] py-1 w-44 text-center text-[12px] uppercase cursor-pointer font-bold' onClick={onClick}>
            {name}
          </div>
      }
    </>
  )
}

const ChoiceButton = ({ name = '', content = '', answer = '', choice, setChoice, removed }) => {
  const buttonClick = () => {
    if (choice === '') {
      setChoice(name)
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
        {
          removed ?
            <div className='text-gray-500 text-[32px] line-through'>{content}</div>
            :
            <div className='text-gray-500 text-[32px]'>{content}</div>
        }
      </div>
    </>
  )
}
const Study = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const exams = useSelector(state => state.problemReducer.problems)
  const loading = useSelector(state => state.problemReducer.loading)
  const answers = useSelector(state => state.answerReducer.answers)
  const cheatNum = useSelector(state => state.answerReducer.cheatNum)
  const name = useSelector(state => state.todoReducer.category)
  const testNum = useSelector(state => state.todoReducer.index)
  const [currentData, setCurrentData] = useState({})
  const [length, setLength] = useState()
  const [choice, setChoice] = useState('')

  const [isKillerChecked, setIsKillerChecked] = useState(false)
  const [isGuessChecked, setIsGuessChecked] = useState(false)
  const [isMemoryChecked, setIsMemoryChecked] = useState(false)
  const [isVideoClicked, setIsVideoClicked] = useState(false)
  const [leftCheatNum, setLeftCheatNum] = useState(CHEATNUM)
  const [cheatText, setCheatText] = useState([])

  useEffect(() => {
    setCheatText('')
    if (name === 'todotest')
      dispatch(getProblems(testNum))
    else
      dispatch(readProblems(testNum, name))
  }, [])

  useEffect(() => {
    setIsVideoClicked(false)
    setCheatText('')
    setLeftCheatNum(CHEATNUM - cheatNum)
    if (exams)
      setCurrentData(exams[id - 1])
    if (answers[id - 1]) {
      if (answers[id - 1].choice) {
        setChoice(answers[id - 1].choice)
      }
      else
        setChoice('')
      if (answers[id - 1].isKiller)
        setIsKillerChecked(answers[id - 1].isKiller)
      else
        setIsKillerChecked(false)
      if (answers[id - 1].isGuess)
        setIsGuessChecked(answers[id - 1].isGuess)
      else
        setIsGuessChecked(false)
      if (answers[id - 1].isMemory)
        setIsMemoryChecked(answers[id - 1].isMemory)
      else
        setIsMemoryChecked(false)
    }
    else {
      setChoice('')
      setIsGuessChecked(false)
      setIsKillerChecked(false)
      setIsMemoryChecked(false)
    }
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
      navigate(`/study/${previous}`)
    }
  }
  const onNextClick = () => {
    if (choice === '') {
      toast.error('You should choose an answer.')
    }
    else {
      const data = {
        isKiller: isKillerChecked,
        isGuess: isGuessChecked,
        isMemory: isMemoryChecked,
        isVideo: isVideoClicked,
        choice: choice,
        isTrue: currentData.answer === choice ? true : false
      }
      if (answers.length === Number(id) - 1)
        dispatch(addAnswer(data))

      if (Number(id) !== length) {
        const next = Number(id) + 1
        navigate(`/study/${next}`)
      }
      else (
        navigate('/study/result')
      )
    }
  }

  const onKillerClick = () => {
    setIsKillerChecked(!isKillerChecked)
  }

  const onGuessClick = () => {
    setIsGuessChecked(!isGuessChecked)
  }

  const onMemoryClick = () => {
    setIsMemoryChecked(!isMemoryChecked)
  }

  const onVideoClick = () => {
    setIsVideoClicked(true)
  }

  const getRandomText = (length) => {
    let num = Math.floor(Math.random() * length) + 1
    console.log(num)
    if ('choice' + `${num}` !== currentData.answer)
      return 'choice' + `${num}`
    else {
      console.log('again')
    }
  }
  const cheatNumClick = () => {
    if (leftCheatNum === 0)
      toast.error("You can not use this button.")
    else {
      const length = currentData.choice4 ? 4 : 3;
      if (cheatText.length < length - 1) {
        let removeText = getRandomText(length - 1)
        console.log('cheatText: ', cheatText)
        if (cheatText.includes(removeText) || removeText === undefined)
          removeText = getRandomText(length - 1)
        else {
          const newArray = [...cheatText, removeText]
          setCheatText(newArray)
          console.log('newArray: ', newArray)
          setLeftCheatNum(leftCheatNum - 1)
          dispatch(increaseCheatNum())
        }

      }
      else {
        toast.error('You run out this on this problem.')
      }
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
                <div className='flex flex-col justify-center items-center w-1/2'>
                  <div className='flex flex-row'>
                    <StudyButton name='killer pregunta' onClick={onKillerClick} checked={isKillerChecked} />
                    <StudyButton name='la he adivinado' onClick={onGuessClick} checked={isGuessChecked} />
                    <StudyButton name='de memoria' onClick={onMemoryClick} checked={isMemoryChecked} />
                  </div>
                  <img className='min-w-[701px] w-[751px] py-3' src={currentData.image} alt='test_image' />
                  <div className='flex flex-row gap-5'>
                    <div className='flex flex-row bg-[#3598DB] space-x-5 py-4 w-52 rounded-xl items-center justify-center cursor-pointer' onClick={onVideoClick}>
                      <img src='/assets/icons/Group 88.png' alt='video' />
                      <span className='text-white text-center text-normal uppercase font-bold'>ver video</span>
                    </div>
                    <div className='flex flex-row bg-[#87A7BC] space-x-5 py-4 w-80 rounded-xl items-center justify-center cursor-pointer' onClick={cheatNumClick}>
                      <img src='/assets/icons/Path 1525.png' alt='video' />
                      <span className='text-white text-center text-normal uppercase font-bold'>eliminar respuestas</span>
                      <div className='flex flex-row bg-[#5ECFFF] rounded-full text-sm text-white text-center justify-center items-center w-7 h-7'>{leftCheatNum}</div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col justify-center gap-10 w-1/2 px-10'>
                  <div className='mt-20 text-[32px] text-gray-500'>
                    {currentData.title}
                  </div>
                  <ChoiceButton name='choice1' content={currentData.choice1} answer={currentData.answer} choice={choice} setChoice={setChoice} removed={cheatText.includes('choice1') ? true : false} />
                  <ChoiceButton name='choice2' content={currentData.choice2} answer={currentData.answer} choice={choice} setChoice={setChoice} removed={cheatText.includes('choice2') ? true : false} />
                  <ChoiceButton name='choice3' content={currentData.choice3} answer={currentData.answer} choice={choice} setChoice={setChoice} removed={cheatText.includes('choice3') ? true : false} />
                  {
                    currentData.choice4 ?
                      <ChoiceButton name='choice4' content={currentData.choice4} answer={currentData.answer} choice={choice} setChoice={setChoice} removed={cheatText.includes('choice4') ? true : false} />
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
                      return <DisplayButton num={row} pageId={key + 1} visited={answers[key] ? true : false} key={key} correct={answers[key] ? answers[key].isTrue : false} />
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

export default Study