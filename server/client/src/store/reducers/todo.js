import {
  GET_TESTS,
  SET_TESTS,
  GET_INDEX,
  TEST_LOADING,
  GET_CATEGORY,
} from '../constants'

const initialState = {
  tests: [],
  category: '',
  index: 0,
  loading: false
}

const todoReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: payload
      }
    case GET_TESTS:
      return {
        ...state,
        tests: payload,
        loading: false
      }
    case SET_TESTS:
      return {
        ...state,
        tests: payload,
      }
    case GET_INDEX:
      return {
        ...state,
        index: payload
      }
    case TEST_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state
  }
}

export default todoReducer

