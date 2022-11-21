import React, { useEffect, useState } from 'react'
import Top from './Top'
import Bottom from './Bottom'
import { BsFillLightningChargeFill, BsFillXCircleFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const Result = () => {
  const answers = useSelector(state => state.answerReducer.answers)
  const questions = useSelector(state => state.problemReducer.problems)
  const [correctNum, setCorrectNum] = useState(0)
  const [falseNum, setFalseNum] = useState(0)
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
  return (
    <>
      <Top id={30} />
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
            <div className='rounded-xl bg-[#3598DB] text-white text-sm py-3 w-36 cursor-pointer'>resultado test</div>
            <div className='rounded-xl bg-[#3598DB] text-white text-sm py-3 w-36 cursor-pointer'>resultados live</div>
            <div className='rounded-xl bg-[#3598DB] text-white text-sm py-3 w-36 cursor-pointer'>siguient test</div>
            <div className='rounded-xl bg-[#3598DB] text-white text-sm py-3 w-36 cursor-pointer'>tests</div>
          </div>
          <div className='flex flex-row text-lg font-bold my-10 items-center'>
            resultados
            <div className='text-sm font-light'>&nbsp;-------------------------------------------------------------------------------------------------------</div>
          </div>
          <div className='ml-32'>
            <div className='flex flex-col gap-7'>
              <div className='flex flex-row space-x-6'>
                <div className='h-12 w-2 rounded-md bg-[#3598DB]' />
                <div className='flex text-center items-center justify-center py-2 w-12 h-12 bg-[#3598DB] rounded-md'>
                  <img src='/assets/icons/profile.png' alt='profile' />
                </div>
                <div className='flex flex-col justify-between'>
                  <div className='text-md font-bold'>Alumno:lorena P.B</div>
                  <div className='text-sm text-gray-500'>Friday, November 18 2022</div>
                </div>
              </div>
              <div className='flex flex-row space-x-6'>
                <div className='h-12 w-2 rounded-md bg-[#87A7BC]' />
                <div className='flex text-center items-center justify-center py-2 w-12 h-12 bg-[#87A7BC] rounded-md'>
                  <img src='/assets/icons/category.png' alt='profile' />
                </div>
                <div className='flex flex-col justify-center'>
                  <div className='text-md font-bold'>Modo del examen: Examen</div>
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

export default Result