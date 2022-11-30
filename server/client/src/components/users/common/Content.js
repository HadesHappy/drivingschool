import React, { useState, useEffect } from 'react'
import TodoTest from './tests/TodoTest'
import Temas from './temas'
import { useLoaderData, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth } from '../../../contexts/AuthContext'
import { readTests, getTodoTests } from '../../../actions/test'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import NamedTest from './tests/NamedTest'

const Content = () => {
  const { id } = useParams();
  const tests = useSelector(state => state.todoReducer.tests)
  const loading = useSelector(state => state.todoReducer.loading)
  const { account, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  let string = ''
  let flag = false;

  const loadData = () => {
    if (!flag) {
      flag = true
      switch (id) {
        case 'todotest':
          dispatch(getTodoTests())
          break;
        case 'testportemas':
          string = (<><Temas /></>)
          break;
        default: dispatch(readTests(id))
      }
    }
  }

  useEffect(() => {
    loadData() 
  }, [id])

  useEffect(()=>{
    if (!isLoggedIn)
      navigate('/')
  },[isLoggedIn])

  if(loading === false) {
    if (id === 'todotest')
      string = (
        tests.map((test, key) =>
          <TodoTest test={test} no={key + 1} key={key} />
        )
      )
    else if (id === 'testportemas') {
      string = (<><Temas /></>)
    }
    else {
      string = (tests.map((test, key) =>
        <NamedTest test={test} name={id} key={key} />
      ))
    }
  }
  else{
    string = (<></>)
  }

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