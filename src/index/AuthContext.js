import {createContext} from 'react'

export const AuthContext = createContext({
  login: function() {},
  logout: function() {},
  token: null,
  userData: {},
  isAuthenticated: false
})
