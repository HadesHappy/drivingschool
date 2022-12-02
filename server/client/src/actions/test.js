import {
  GET_INDEX,
} from '../store/constants'

const setIndex = (id) => dispatch => {
  dispatch({ type: GET_INDEX, payload: id })
}

export {
  setIndex,
}