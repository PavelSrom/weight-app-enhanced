import { GET_PROFILE, PROFILE_ERROR } from './types'
import axios from 'axios'

// get user's profile
export const getProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/me/profile')

    dispatch({ type: GET_PROFILE, payload: res.data })
  } catch (err) {
    console.log(err)
    dispatch({ type: PROFILE_ERROR, payload: err.response })
  }
}

// create a new profile
export const createProfile = (formData, history) => async dispatch => {
  try {
    const res = await axios.post('/api/me/profile', formData)

    dispatch({ type: GET_PROFILE, payload: res.data })
    history.push('/dashboard')
  } catch (err) {
    console.log(err)
    dispatch({ type: PROFILE_ERROR, payload: err.response })
  }
}

// update an existing profile
export const updateProfile = (formData, history) => async dispatch => {
  try {
    const res = await axios.put('/api/me/profile', formData)

    dispatch({ type: GET_PROFILE, payload: res.data })
    history.push('/dashboard')
  } catch (err) {
    console.log(err)
    dispatch({ type: PROFILE_ERROR, payload: err.response })
  }
}
