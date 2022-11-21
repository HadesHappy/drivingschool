import {
  ADD_ANSWER,
  UPDATE_ANSWER,
  CLEAR_ANSWER,
} from '../constants'

const initialState = {
  answers: [],
}

const answerReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case CLEAR_ANSWER:
      return initialState
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

export default answerReducer

