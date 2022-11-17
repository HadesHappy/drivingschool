import React, { useState, useEffect } from 'react'
import TodoTest from './tests/TodoTest'
import Temas from './temas'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Modal from './tests/Modal'

import { readTests, getTests } from '../../../actions/test'

import { useDispatch } from 'react-redux'

import NamedTest from './tests/NamedTest'

const Content = () => {
  const { id } = useParams();
  const [string, setString] = useState()
  const tests = useSelector(state => state.todoReducer.tests)
  const loading = useSelector(state => state.todoReducer.loading)

  const dispatch = useDispatch()

  useEffect(() => {
    switch (id) {
      case 'todotest':
        dispatch(getTests())
        break;
      case 'testportemas':
        setString(<><Temas /></>)
        break;
      default: dispatch(readTests(id))
    }
  }, [id])

  useEffect(() => {
    if (id === 'todotest')
      setString(
        tests.map((test, key) =>
          <TodoTest test={test} key={key} />
        )
      )
    else if (id === 'testportemas') {
      setString(<><Temas /></>)
    }
    else {
      setString(tests.map((test, key) =>
        <NamedTest test={test} name={id} key={key} />
      ))
    }
  }, [loading])

  return (
    <>
      <div className='mt-10'>
        {
          string
        }
        <Modal />
      </div>
    </>

  )
}

export default Content