import React, {useState} from 'react'
import {useAuth} from './../../hooks/useAuth'
import useServerRequest from './../../hooks/useServerRequest'
import Auth__form from './Auth__form'
import Auth__player from './Auth__player'
import config from '../../../config.json'

export default function Auth() {
  const PORT = config.port
  const HOST = config.host
  const [authLog, setAuthLog] = useState(" ")
  const { login, logout, userData, token } = useAuth()
  const isAuthenticated = token != null
  const { serverRequest } = useServerRequest()

  function onReg(data) {
    return serverRequest('POST', "http://" + HOST + ":" + PORT + "/auth/reg", data, "text")
      .then(serverLog => {
        setAuthLog(serverLog)
        return serverLog.toString()
      })
  }
  function onLogin(data) {
    serverRequest('POST', "http://" + HOST + ":" + PORT + "/auth/login", data, "text")
      .then(serverLog => {
        setAuthLog(serverLog)
        const data = JSON.parse(serverLog)
        login(data.token, data.userData)
      })
  }
  function onLogout() {
    logout()
  }

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
