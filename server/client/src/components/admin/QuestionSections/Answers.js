import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateProblem } from '../../../actions/problem'

const AnswerField = ({ placeholder = '', answer_id = '', answer, setAnswer }) => {
  const { id } = useParams()

  const problem = useSelector(state => state.problemReducer.problems[id - 1])

  const dispatch = useDispatch()
  const [text, setText] = useState('')

  useEffect(() => {
    if (problem) {
      if (problem[answer_id])
        setText(problem[answer_id])
      else
        setText('')
      if (problem.answer)
        setAnswer(answer)
      else
        setAnswer('')
    }
    else
      setText('')
  }, [id, problem])

  const handleChange = (e) => {
    setText(e.target.value)

    const data = {
      id: id,
      property: answer_id,
      value: e.target.value
    }
    dispatch(updateProblem(data))
  }

  const handleCheckClick = (e) => {
    setAnswer(answer_id)
    if (e.target.checked === true) {
      const data = {
        id: id,
        property: 'answer',
        value: answer_id
      }
      dispatch(updateProblem(data))
    }
    else {
      setAnswer('')
      const data = {
        id: id,
        property: 'answer',
        value: '',
      }
      dispatch(updateProblem(data))
    }

  }

  return (
    <>
      <div className='relative text-center mb-5'>
        <input type='checkbox' className='absolute float-right right-7 w-8 h-8 mt-9' checked={answer_id === answer ? true : false} onChange={handleCheckClick} />
        <input
          type='text'
          className='w-full px-16 py-8 text-3xl text-[#C4BEBE] bg-[#F2F5FA] border-none focus:outline-none'
          placeholder={placeholder}
          value={text ? text : ''}
          onChange={handleChange}
        />
      </div>
    </>
  )
}

const Answers = () => {
  const [answer, setAnswer] = useState('')

  const { id } = useParams()
  const problem = useSelector(state => state.problemReducer.problems[id - 1])

  useEffect(() => {
    if (problem) {
      if (problem.answer) {
        setAnswer(problem.answer)
      }
    }
  }, [id, problem])

  return (
    <>
      <AnswerField placeholder='Respuesta 1' answer_id='choice1' answer={answer} setAnswer={setAnswer} />
      <AnswerField placeholder='Respuesta 2' answer_id='choice2' answer={answer} setAnswer={setAnswer} />
      <AnswerField placeholder='Respuesta 3' answer_id='choice3' answer={answer} setAnswer={setAnswer} />
      <AnswerField placeholder='Respuesta 4' answer_id='choice4' answer={answer} setAnswer={setAnswer} />
    </>
  )
}

export default Answers