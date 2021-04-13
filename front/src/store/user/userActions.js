import { LOGIN } from './userTypes'
import { LOGOUT } from './userTypes'

export function login() {
  return {
    type: LOGIN,
    payload: "noname"
  }
}

export function logout() {
  return {
    type: LOGOUT
  }
}
