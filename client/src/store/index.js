import { combineReducers } from 'redux'
import auth from './reducers/auth'
import profile from './reducers/profile'
import exercises from './reducers/exercises'
import logs from './reducers/logs'

const rootReducer = combineReducers({
  auth,
  profile,
  exercises,
  logs
})

export default rootReducer
