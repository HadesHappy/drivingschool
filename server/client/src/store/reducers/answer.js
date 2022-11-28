import {
  ADD_ANSWER,
  UPDATE_ANSWER,
  CLEAR_ANSWER,
  INCREASE_CHEATNUM,
} from '../constants'

const initialState = {
  answers: [],
  cheatNum: 0,
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
    case INCREASE_CHEATNUM:
      return {
        ...state,
        cheatNum: state.cheatNum + 1
      }
    default:
      return state
  }
}

export default answerReducer

