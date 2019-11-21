import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOADED_SUCCESS,
  LOADED_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAR_LOGS,
  CLEAR_EXERCISES
} from './types'
import axios from 'axios'
import { setAxiosToken } from '../../utils/setAxiosToken'

// load user on website visit
export const loadUser = () => async dispatch => {
  if (localStorage.token) setAxiosToken(localStorage.token)

  try {
    const res = await axios.get('/api/auth')

    dispatch({ type: LOADED_SUCCESS, payload: res.data })
  } catch (err) {
    console.log(err)
    dispatch({ type: LOADED_FAIL })
  }
}

// register user
export const registerUser = formData => async dispatch => {
  try {
    const res = await axios.post('/api/auth/register', formData)

    dispatch({ type: REGISTER_SUCCESS, payload: res.data })
    dispatch(loadUser())
  } catch (err) {
    console.log(err.response.data)
    dispatch({ type: REGISTER_FAIL })
  }
}

// login user
export const loginUser = formData => async dispatch => {
  try {
    const res = await axios.post('/api/auth/login', formData)

    dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    dispatch(loadUser())
  } catch (err) {
    console.log(err.response)
    dispatch({ type: LOGIN_FAIL })
  }
}

// logout
export const logoutUser = () => dispatch => {
  dispatch({ type: CLEAR_EXERCISES })
  dispatch({ type: CLEAR_LOGS })
  dispatch({ type: CLEAR_PROFILE })
  dispatch({ type: LOGOUT })
}
