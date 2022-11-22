import React, { useState, useEffect } from 'react'
import TodoTest from './tests/TodoTest'
import Temas from './temas'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth } from '../../../contexts/AuthContext'
import { readTests, getTests } from '../../../actions/test'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import NamedTest from './tests/NamedTest'

const Content = () => {
  const { id } = useParams();
  const [string, setString] = useState()
  const tests = useSelector(state => state.todoReducer.tests)
  const loading = useSelector(state => state.todoReducer.loading)
  const { account, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(!isLoggedIn)
      navigate('/')
    switch (id) {
      case 'todotest':
        dispatch(getTests())
        break;
      case 'testportemas':
        setString(<><Temas /></>)
        break;
      default: dispatch(readTests(id))
    }
  }, [id, isLoggedIn])

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
      </div>
    </>

  )
}

export default Content