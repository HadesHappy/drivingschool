import {
  GET_PROBLEM,
  ADD_PROBLEM,
  UPDATE_PROBLEM,
  DELETE_PROBLEM,
  INITIALIZE_PROBLEMS,
} from "../store/constants"

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

const deleteProblem = id => async dispatch => {
  const data = {
    id: id
  }
  await dispatch({ type: DELETE_PROBLEM, payload: data })
}

const initializeProblems = () => async dispatch => {
  await dispatch({ type: INITIALIZE_PROBLEMS })
}

export {
  addProblem,
  getProblem,
  deleteProblem,
  updateProblem,
  initializeProblems,
}
