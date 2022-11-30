import {
  GET_TESTS,
  SET_TESTS,
  GET_INDEX,
  GET_CATEGORY,
  TEST_LOADING
} from '../store/constants'

import axios from '../utils/axios'
import HEADER from '../apis/header'

const getTodoTests = () => async dispatch => {
  try {
    dispatch({ type: TEST_LOADING })
    dispatch({ type: GET_CATEGORY, payload: 'todotest' })
    const data = await axios.get('api/question/todotest', HEADER());
    dispatch({ type: GET_TESTS, payload: data.data })
  }
  catch (error) {
    return error
  }
}

const getTests = () => async dispatch => {
  try {
    dispatch({ type: TEST_LOADING })
    const data = await axios.get('api/question/read');
    dispatch({ type: GET_TESTS, payload: data.data })
  }
  catch (error) {
    return error
  }
}

const readTests = name => async dispatch => {
  try {
    dispatch({ type: TEST_LOADING })
    dispatch({ type: GET_CATEGORY, payload: name })
    const data = await axios.get(`api/question/readbyName/${name}`, HEADER())
    dispatch({ type: GET_TESTS, payload: data.data })
  }
  catch (error) {
    return (error)
  }
}

const readCategoryTests = name => async dispatch => {
  try {
    dispatch({ type: GET_CATEGORY, payload: name })
    const data = await axios.get(`api/question/readbyName/${name}`, HEADER())
    dispatch({ type: SET_TESTS, payload: data.data })
  }
  catch (error) {
    return (error)
  }
}

const setIndex = (num) => dispatch => {
  dispatch({ type: GET_INDEX, payload: num })
}

export {
  getTests,
  getTodoTests,
  setIndex,
  readTests,
  readCategoryTests,
}