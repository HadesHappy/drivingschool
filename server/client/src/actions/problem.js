import {
  GET_PROBLEM,
  ADD_PROBLEM,
  UPDATE_PROBLEM,
  GET_PROBLEMS,
  DELETE_PROBLEM,
  INITIALIZE_PROBLEMS,
  PROBLEM_LOADING,
} from "../store/actions/constants"

import axios from "../utils/axios"

//Add Problem
const addProblem = problemData => async dispatch => {
  try {
    await dispatch({ type: ADD_PROBLEM, payload: problemData })
  }
  catch (error) {
    return error
  }
}

const getProblem = id => async dispatch => {
  try {
    const data = {
      id: id
    }
    await dispatch({ type: GET_PROBLEM, payload: data })
  }
  catch (error) {
    return error
  }

}

const updateProblem = data => async dispatch => {
  try {
    await dispatch({ type: UPDATE_PROBLEM, payload: data })
  }
  catch (error) {
    return error
  }
}

const getProblems = (id) => async dispatch => {
  try {
    dispatch({ type: PROBLEM_LOADING })
    const data = await axios.get(`api/question/read/${id}`)
    dispatch({ type: GET_PROBLEMS, payload: data.data })
  }
  catch (error) {
    return error
  }

}

const readProblems = (id, name) => async dispatch => {
  try {
    dispatch({ type: PROBLEM_LOADING })
    const data = await axios.get(`api/question/readbyId/${id}/${name}`)
    dispatch({ type: GET_PROBLEMS, payload: data.data })
  }
  catch (error) {
    return error
  }

}

const deleteProblem = id => async dispatch => {
  const data = {
    id: id
  }
  dispatch({ type: DELETE_PROBLEM, payload: data })
}

const initializeProblems = () => async dispatch => {
  dispatch({ type: INITIALIZE_PROBLEMS })
}

export {
  addProblem,
  getProblem,
  getProblems,
  deleteProblem,
  updateProblem,
  initializeProblems,
  readProblems
}
