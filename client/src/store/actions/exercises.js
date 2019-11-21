import { GET_EXERCISES } from './types'
import axios from 'axios'

export const getExerciseList = () => async dispatch => {
  try {
    const res = await axios.get('/api/exercises')

    dispatch({ type: GET_EXERCISES, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}
