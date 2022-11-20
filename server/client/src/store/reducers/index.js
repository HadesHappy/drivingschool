import { combineReducers } from "redux"
import testReducer from './test'
import todoReducer from "./todo"
import problemReducer from './problem'

const reducer = combineReducers({
  testReducer,
  problemReducer,
  todoReducer,
})

export default reducer