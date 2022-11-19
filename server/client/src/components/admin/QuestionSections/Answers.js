import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateProblem } from '../../../actions/problem'

const AnswerField = ({ placeholder = '', answer_id = '', answer, setAnswer, choices, setChoices }) => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const handleChange = (e) => {
    let newChoices = [...choices];
    newChoices[answer_id-1] = e.target.value;
    setChoices(newChoices);

    const data = {
      id: id,
      property: 'choices',
      value: newChoices
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
        value: 0
      }
      dispatch(updateProblem(data))
    }
  }

  return (
    <>
      <div className='relative text-center mb-5'>
        <input type='checkbox' className='absolute float-right right-7 w-8 h-8 mt-9' checked={answer === answer_id} onChange={handleCheckClick} />
        <input
          type='text'
          className='w-full px-16 py-8 text-3xl text-[#C4BEBE] bg-[#F2F5FA] border-none focus:outline-none'
          placeholder={placeholder}
          value={choices[answer_id-1]}
          onChange={handleChange}
        />
      </div>
    </>

  )
}

const Answers = () => {
  const [choices, setChoices] = useState(['', '', '', ''])
  const [answer, setAnswer] = useState(0)

  const { id } = useParams()
  const problem = useSelector(state => state.problemReducer.problems[id - 1])

  useEffect(() => {
    if (problem) {
      if (problem.choices) {
        setChoices(problem.choices)

      }
      else
        setChoices(['', '', '', ''])
      if (problem.answer)
        setAnswer(problem.answer)
      else
        setAnswer(0)
    }
    else {
      setChoices(['', '', '', ''])
      setAnswer(0)
    }
  }, [id, problem])

  return (
    <>
      <AnswerField placeholder='Respuesta 1' answer_id={1} answer={answer} setAnswer={setAnswer} choices={choices} setChoices={setChoices} />
      <AnswerField placeholder='Respuesta 2' answer_id={2} answer={answer} setAnswer={setAnswer} choices={choices} setChoices={setChoices} />
      <AnswerField placeholder='Respuesta 3' answer_id={3} answer={answer} setAnswer={setAnswer} choices={choices} setChoices={setChoices} />
      <AnswerField placeholder='Respuesta 4' answer_id={4} answer={answer} setAnswer={setAnswer} choices={choices} setChoices={setChoices} />
    </>
  )
}

export default Answers