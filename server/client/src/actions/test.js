import {
  GET_INDEX,
  GET_TOPNUM,
} from '../store/constants'

const setIndex = (id) => dispatch => {
  dispatch({ type: GET_INDEX, payload: id })
}

const setTopNum = (num) => dispatch => {
  dispatch({ type: GET_TOPNUM, payload: num })
}

export {
  setIndex,
  setTopNum,
}