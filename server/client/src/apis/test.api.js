import axios from '../utils/axios'
import HEADER from './header'
import {
  GET_TESTS,
  SET_TESTS,
  GET_CATEGORY,
  PROBLEM_LOADING,
  GET_PROBLEMS,
  TEST_LOADING
} from '../store/constants'

const getTestData = (category) => async dispatch => {
  try {
    dispatch({ type: GET_CATEGORY, payload: category })
    if (!category.startsWith('category'))
      dispatch({ type: TEST_LOADING })
    const res = await axios.get(`api/test/readTestData/${category}`, HEADER())
    if (category.startsWith('category'))
      dispatch({ type: SET_TESTS, payload: res.data })
    else {
      dispatch({ type: GET_TESTS, payload: res.data })
    }
  }
  catch (error) {

  }
}

const getExamData = (id, category) => async dispatch => {
  try {
    console.log(id, category)
    dispatch({ type: PROBLEM_LOADING })
    const res = await axios.get(`api/test/readExamData/${id}/${category}`)
    dispatch({ type: GET_PROBLEMS, payload: res.data })
  }
  catch (error) {

  }
}

const getStudyData = (id, category) => async dispatch => {
  try {
    dispatch({ type: PROBLEM_LOADING })
    const res = await axios.get(`api/test/readStudyData/${id}/${category}`)
    dispatch({ type: GET_PROBLEMS, payload: res.data })
  }
  catch (error) {

  }
}

const readLiveResult = async (id, category) => {
  try {
    const res = await axios.get(`api/test/readResult/${id}/${category}`)
    return res.data
  }
  catch (error) {

  }
}

export {
  getTestData,
  getExamData,
  getStudyData,
  readLiveResult,
}