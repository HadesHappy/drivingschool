import {
  ADD_ANSWER,
  UPDATE_ANSWER,
  CLEAR_ANSWER,
} from '../store/constants'

const addAnswer = data => dispatch => {
  dispatch({ type: ADD_ANSWER, payload: data })
}

const updateAnswer = data => dispatch => {
  dispatch({ type: UPDATE_ANSWER, payload: data })
}

const clearAnswer = () => dispatch => {
  dispatch({ type: CLEAR_ANSWER })
}

export {
  addAnswer,
  updateAnswer,
  clearAnswer,
}
