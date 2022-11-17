import {
  GET_TESTS,
  SET_INDEX,
  TEST_LOADING
} from '../store/actions/constants'

import axios from '../utils/axios'

const getTests = () => async dispatch => {
  try{
    dispatch({ type: TEST_LOADING })
    const data = await axios.get('api/question/read');
    dispatch({ type: GET_TESTS, payload: data.data })
  }
  catch(error){
    return error
  }
  
}

const readTests = id => async dispatch => {
  try{
    dispatch({ type: TEST_LOADING })
    console.log('id: ', id)
    const data = await axios.get(`api/question/readbyName/${id}`)
    console.log(data.data)
    dispatch({ type: GET_TESTS, payload: data.data })
  }
  catch(error){
    return(error)
  }
}

const setIndex = (num) => dispatch => {
  dispatch({type: SET_INDEX, payload: num})
}

export {
  getTests,
  setIndex,
  readTests,
}