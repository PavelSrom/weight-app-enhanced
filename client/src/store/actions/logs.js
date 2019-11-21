import { GET_LOGS, ADD_LOG, UPDATE_LOG } from './types'
import axios from 'axios'

export const getAllLogs = () => async dispatch => {
  try {
    const res = await axios.get('/api/me/logs')

    dispatch({ type: GET_LOGS, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}

export const addLog = formData => async dispatch => {
  try {
    const res = await axios.post('/api/me/logs', formData)

    dispatch({ type: ADD_LOG, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}

export const updateLog = (logID, formData) => async dispatch => {
  try {
    const res = await axios.put(`/api/me/logs/${logID}`, formData)

    dispatch({ type: UPDATE_LOG, payload: res.data })
  } catch (err) {
    console.log(err)
  }
}
