import useServerRequest from './../../hooks/useServerRequest'
import config from './../../../config.json'
const HOST = config.host
const PORT = config.port

export default function useAuthRequests(login, logout) {
  const { serverRequest } = useServerRequest()
  function onReg(data) {
    return serverRequest('POST', "http://" + HOST + ":" + PORT + "/auth/reg", data)
      .then(data => {
        return data.log
      })
  }
  function onLogin(data) {
    return serverRequest('POST', "http://" + HOST + ":" + PORT + "/auth/login", data)
      .then(data => {
        if (data.status <= 2) {
          return data.log
        } else {
          // FIXME:
          login(data.token, data.userData)
          return "ok"
        }
      })
  }
  function onLogout() {
    logout()
  }

  return { onReg, onLogin, onLogout }
}
