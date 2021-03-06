import React, {useContext} from 'react'
import {useAuth} from './useAuth'

const AuthContext = React.createContext()

export function useAuthContext() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={useAuth()}>
      {children}
    </AuthContext.Provider>
  )
}
