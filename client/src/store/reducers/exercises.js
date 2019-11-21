import { GET_EXERCISES, CLEAR_EXERCISES } from '../actions/types'

const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case GET_EXERCISES:
      return [...payload]
    case CLEAR_EXERCISES:
      return []
    default:
      return state
  }
}

export default reducer
