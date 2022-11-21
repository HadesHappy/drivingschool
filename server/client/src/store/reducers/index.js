import { combineReducers } from "redux"
import todoReducer from "./todo"
import problemReducer from './problem'
import answerReducer from "./answer"

const reducer = combineReducers({
  problemReducer,
  todoReducer,
  answerReducer,
})

export default reducer