import {createContext} from 'react'

export const AuthContext = createContext({
  login: function() {},
  logout: function() {},
  userid: null,
  token: null,
  isAuthenticated: false
})
