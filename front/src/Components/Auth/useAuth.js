import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export function useAuth() {
  const [token, setToken] = useState(null)
  const [userData, setUserData] = useState({})

  const login = useCallback((jwtToken, data) => {
    setToken(jwtToken)
    setUserData(data)

    localStorage.setItem(storageName, JSON.stringify({
      userData: data,
      token: jwtToken
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserData({})
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token) {
      login(data.token, data.userData)
    }
  }, [login])

  return { login, logout, userData, token }
}
