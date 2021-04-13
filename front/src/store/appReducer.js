import { combineReducers } from 'redux'
import userReducer from './user/userReducer'

export const appReducer = combineReducers({
  user: userReducer
})
