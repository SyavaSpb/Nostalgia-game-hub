import { LOGIN } from './userTypes'
import { LOGOUT } from './userTypes'

const initialState = {
  token: '',
  name: '',
  records: {}
}

// добавить логики взаимодействия с 

export default function userReducer(state = initialState, action) {
  if (action.type === LOGIN) {
    return {
      ...state,
      name: action.payload,
      token: "token"
    }
  } else if (action.type === LOGOUT) {
    return {
      ...state,
      ...initialState
    }
  }
  return state
}
