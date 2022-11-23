import React, { useEffect, useState } from 'react'
import Top from '../exam/Top'
import Bottom from '../exam/Bottom'
import { BsFillLightningChargeFill, BsFillXCircleFill } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setIndex } from '../../../actions/test'
import { toast } from 'react-hot-toast'
import { clearAnswer } from '../../../actions/answer'
import { useAuth } from '../../../contexts/AuthContext'

const StudyResult = () => {
  const answers = useSelector(state => state.answerReducer.answers)
  const questions = useSelector(state => state.problemReducer.problems)
  const category = useSelector(state => state.todoReducer.category)
  const index = useSelector(state => state.todoReducer.index)
  const tests = useSelector(state => state.todoReducer.tests)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [correctNum, setCorrectNum] = useState(0)
  const [falseNum, setFalseNum] = useState(0)
  const { account } = useAuth()

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const current = new Date();
  const date = `${weekday[current.getDay()]}, ${month[current.getMonth()]} ${current.getDate()} ${current.getFullYear()}`;

  const checkAnswers = () => {
    let count1 = 0;
    let count2 = 0;

    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === questions[i].answer)
        count1++
      else
        count2++
    }

    setCorrectNum(count1)
    setFalseNum(count2)
  }
  useEffect(() => {
    checkAnswers()
  }, [])

  const handleNextClick = () => {
    const length = tests.length
    if (index < length) {
      dispatch(setIndex(index + 1))
      dispatch(clearAnswer())
      navigate('/exam/1')
    }
    else
      toast.error('This is the last test. There is not next test.')
  }

  const handleTestsClick = () => {
    if (category.startsWith('category'))
      navigate('/user/testportemas')
    else
      navigate(`/user/${category}`)
  }
  return (
    <>
      <Top id={answers.length} />
      <div className='flex flex-row 2xl:gap-40 xl: gap-20'>
        <div className='flex flex-col 2xl:pl-60 xl:pl-20 mt-10'>
          <div className='flex flex-row float-left'>
            <div className='flex flex-col items-center justify-center'>
              <div className='text-4xl font-bold py-2'>Wow! Eres un crack</div>
              <div className='flex flex-row test-lg text-gray-500 gap-2 py-3'>Autoescuela App Test 001
                {
                  falseNum <= 3 ?
                    <>
                      <p className='text-lg text-[#26FF4A]'>Apto</p>
                      <img src='/assets/icons/checkall.png' alt='checkall' />
                    </>
                    :
                    <>
                      <p className='text-lg text-[#FF5353]'>No Apto.</p>
                      <img src='/assets/icons/alertall.png' alt='checkall' />
                    </>
                }
              </div>
            </div>
            {
              falseNum <= 3 ?
                <img className='' src='/assets/emotions/success.png' alt='emotion' />
                :
                <img className='' src='/assets/emotions/fail.png' alt='emotion' />
            }

          </div>
          <div className='mt-10 ml-32 flex flex-row gap-5 text-center'>
            <div className='rounded-xl bg-[#3598DB] hover:bg-blue-400 text-white text-sm py-3 w-36 cursor-pointer'>resultado test</div>
            <div className='rounded-xl bg-[#3598DB] hover:bg-blue-400 text-white text-sm py-3 w-36 cursor-pointer' onClick={() => toast.error('There is no live tests result.')}>resultados live</div>
            <div className='rounded-xl bg-[#3598DB] hover:bg-blue-400 text-white text-sm py-3 w-36 cursor-pointer' onClick={handleNextClick}>siguient test</div>
            <div className='rounded-xl bg-[#3598DB] hover:bg-blue-400 text-white text-sm py-3 w-36 cursor-pointer' onClick={handleTestsClick}>tests</div>
          </div>
          <div className='flex flex-row text-lg font-bold my-10 items-center'>
            resultados&nbsp;
            <div className='text-sm font-light border border-dashed border-gray-400 w-full'></div>
          </div>
          <div className='ml-32'>
            <div className='flex flex-col gap-7'>
              <div className='flex flex-row space-x-6'>
                <div className='h-12 w-2 rounded-md bg-[#3598DB]' />
                <div className='flex text-center items-center justify-center py-2 w-12 h-12 bg-[#3598DB] rounded-md'>
                  <img src='/assets/icons/profile.png' alt='profile' />
                </div>
                <div className='flex flex-col justify-between'>
                  <div className='text-md font-bold'>{account.name}</div>
                  <div className='text-sm text-gray-500'>{date}</div>
                </div>
              </div>
              <div className='flex flex-row space-x-6'>
                <div className='h-12 w-2 rounded-md bg-[#87A7BC]' />
                <div className='flex text-center items-center justify-center py-2 w-12 h-12 bg-[#87A7BC] rounded-md'>
                  <img src='/assets/icons/category.png' alt='profile' />
                </div>
                <div className='flex flex-col justify-center'>
                  <div className='text-md font-bold'>Modo del examen: estudio</div>
                </div>
              </div>
              <div className='flex flex-row space-x-6'>
                <div className='h-12 w-2 rounded-md bg-[#87A7BC]' />
                <div className='flex text-center items-center justify-center py-2 w-12 h-12 bg-[#87A7BC] rounded-md text-white'>
                  <BsFillLightningChargeFill className='w-7 h-7' />
                </div>
                <div className='flex flex-col justify-center'>
                  <div className='text-md font-bold'>Total de preguntas: {answers.length}</div>
                </div>
              </div>
              <div className='flex flex-row space-x-6'>
                <div className='h-12 w-2 rounded-md bg-[#4EFF6C]' />
                <div className='flex text-center items-center justify-center py-2 w-12 h-12 bg-[#4EFF6C] rounded-md'>
                  <img src='/assets/icons/check.png' alt='check' />
                </div>
                <div className='flex flex-col justify-center'>
                  <div className='text-md font-bold'>Preguntas correctas: {correctNum}</div>
                </div>
              </div>
              <div className='flex flex-row space-x-6'>
                <div className='h-12 w-2 rounded-md bg-[#FF5353]' />
                <div className='flex text-center items-center justify-center py-2 w-12 h-12 bg-[#FF5353] rounded-md'>
                  <BsFillXCircleFill className='text-white w-7 h-7' />
                </div>
                <div className='flex flex-col justify-between'>
                  <div className='text-md font-bold'>Preguntas incorrectas: {falseNum}</div>
                  <div className='text-sm text-gray-500'>Maximum fallos 3</div>
                </div>
              </div>
              <div className='flex flex-row space-x-6'>
                <div className='h-12 w-2 rounded-md bg-[#87A7BC]' />
                <div className='flex text-center items-center justify-center py-2 w-12 h-12 bg-[#87A7BC] rounded-md'>
                  <img className='text-white w-7 h-7' src='/assets/icons/pen.png' alt='pen'/>
                </div>
                <div className='flex flex-col justify-between'>
                  <div className='text-md font-bold'>Resultados elementados: 05</div>
                  <div className='text-sm text-gray-500'>Maximum elementados 16</div>
                </div>
              </div>
              <div className='flex flex-row space-x-6'>
                <div className='h-12 w-2 rounded-md bg-[#87A7BC]' />
                <div className='flex text-center items-center justify-center py-2 w-12 h-12 bg-[#87A7BC] rounded-md text-white'>
                  <img src='/assets/icons/play.png' alt='play' />
                </div>
                <div className='flex flex-col justify-center'>
                  <div className='text-md font-bold'>Videos visto: 03</div>
                </div>
              </div>
              <div className='flex flex-row space-x-6'>
                <div className='h-12 w-2 rounded-md bg-[#87A7BC]' />
                <div className='flex text-center items-center justify-center py-2 w-12 h-12 bg-[#87A7BC] rounded-md text-white'>
                  <img src='/assets/icons/knife.png' alt='knife' />
                </div>
                <div className='flex flex-col justify-center'>
                  <div className='text-md font-bold'>Has marcado como killers: 05</div>
                </div>
              </div>
              <div className='flex flex-row space-x-6'>
                <div className='h-12 w-2 rounded-md bg-[#87A7BC]' />
                <div className='flex text-center items-center justify-center py-2 w-12 h-12 bg-[#87A7BC] rounded-md text-white'>
                  <img src='/assets/icons/question.png' alt='question' />
                </div>
                <div className='flex flex-col justify-center'>
                  <div className='text-md font-bold'>Has adivindo: 08</div>
                </div>
              </div>
              <div className='flex flex-row space-x-6'>
                <div className='h-12 w-2 rounded-md bg-[#87A7BC]' />
                <div className='flex text-center items-center justify-center py-2 w-12 h-12 bg-[#87A7BC] rounded-md text-white'>
                  <img src='/assets/icons/glass.png' alt='glass' />
                </div>
                <div className='flex flex-col justify-center'>
                  <div className='text-md font-bold'>Sabes de memoria: 03</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center pr-40'>
          <div className='bg-[#3598DB] rounded-xl w-72 h-72 relative'>
            <img className='-mt-32' src='/assets/emotions/video play.png' alt='video play' />
            <div className='text-white px-6 -mt-10'>
              <div className='text-lg'>Próxima clase en vivo con Lorena la profe</div>
              <div className='text-sm'>Empieza en 2 horas 25min</div>
              <div className='text-center py-2 mt-4 bg-gray-200 text-[#3598DB] text-sm w-32 rounded-lg cursor-pointer'>Ver Clase</div>
            </div>
            <img className='absolute -mt-40 float-right right-0 pr-14' src='/assets/icons/Vector.png' alt='vector' />
            <img className='absolute pl-5' src='/assets/icons/Vector2.png' alt='vector' />
          </div>
        </div>
      </div>

      <Bottom />
    </>
  )
}

export default StudyResult