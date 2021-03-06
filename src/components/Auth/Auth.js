import React, {useState, useEffect} from 'react'
import { useAuthContext } from './AuthContext'
import useAuthRequests from './useAuthRequests'
import Auth__form from './Auth__form'
import Auth__player from './Auth__player'

import config from '../../../config.json'
const PORT = config.port
const HOST = config.host

export default function Auth() {
  const { login, logout, userData, token } = useAuthContext()
  const isAuthenticated = token != null
  const {onReg, onLogin, onLogout} = useAuthRequests(login, logout)


  if (isAuthenticated) {
    return (
      <Auth__player
        userData={userData}
        onLogout={onLogout}
      />
    )
  } else {
    return (
      <Auth__form
        onLogin={onLogin}
        onReg={onReg}
      />
    )
  }
}












//
