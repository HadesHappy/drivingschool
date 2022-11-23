import {
  GET_TESTS,
  GET_INDEX,
  GET_CATEGORY,
  TEST_LOADING
} from '../store/constants'

import axios from '../utils/axios'

const getTests = () => async dispatch => {
  try {
    dispatch({ type: TEST_LOADING })
    dispatch({ type: GET_CATEGORY, payload: 'todotest' })
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
    dispatch({type: GET_CATEGORY, payload: name})
    const data = await axios.get(`api/question/readbyName/${name}`)
    dispatch({ type: GET_TESTS, payload: data.data })
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
  setIndex,
  readTests,
}