import axios from '../utils/axios'
import HEADER from './header'

const addHistory = async (data) => {
  try{
    const result = await axios.post('api/history/add', data, HEADER())
    return result
  }
  catch(error){
    console.log(error)
  }
}

export {
  addHistory,
}