import { GET_LOGS, CLEAR_LOGS, ADD_LOG, UPDATE_LOG } from '../actions/types'

const initialState = {
  logs: [],
  loading: true
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_LOGS:
    case ADD_LOG:
    case UPDATE_LOG:
      return {
        ...state,
        logs: payload,
        loading: false
      }
    /*
    case ADD_LOG:
      return {
        ...state,
        logs: [payload, ...state.logs]
      }
    case UPDATE_LOG:
      const targetIndex = state.logs.findIndex(log => log._id === payload._id)
      const newLogs = state.logs.splice(targetIndex, 1, payload)
      return {
        ...state,
        logs: newLogs
      }
    */
    case CLEAR_LOGS:
      return {
        ...state,
        logs: []
      }
    default:
      return state
  }
}

export default reducer
