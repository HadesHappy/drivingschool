import {
  ADD_ANSWER,
  UPDATE_ANSWER,
} from '../store/actions/constants'

const addAnswer = data => dispatch => {
  dispatch({ type: ADD_ANSWER, payload: data })
}

const updateAnswer = data => dispatch => {
  dispatch({ type: UPDATE_ANSWER, payload: data })
}

export {
  addAnswer,
  updateAnswer,
}

