import axios from '../utils/axios'
import HEADER from './header'

const addHistory = async (data) => {
  console.log(data)
  try{
    const result = await axios.post('api/history/add', data, HEADER())
    console.log('result: ', result)
  }
  catch(error){
    console.log(error)
  }
}

export {
  addHistory,
}