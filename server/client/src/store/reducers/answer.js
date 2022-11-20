import {
  ADD_ANSWER,
  UPDATE_ANSWER,
} from '../actions/constants'

const initialState = {
  answers: [],
}

const todoReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_ANSWER:
      return {
        ...state,
        answers: [...state.answers, payload]
      }
    case UPDATE_ANSWER:
      const id = payload.id
      const newAnswers = [...state.answers]
      newAnswers[id] = payload.answers
      return {
        ...state,
        answers: newAnswers
      }
    default:
      return state
  }
}

export default todoReducer

