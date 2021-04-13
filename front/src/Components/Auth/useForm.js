import {useState} from 'react'

export default function useForm(inputs) {
  const [data, setData] = useState(inputs)

  function setLogin(login) {
    const dataNew = {...data}
    dataNew.login = login
    setData(dataNew)
  }
  function setPassword(password) {
    const dataNew = {...data}
    dataNew.password = password
    setData(dataNew)
  }

  return {
    login: {
      value: data.login,
      onChange: event => setLogin(event.target.value)
    },
    password: {
      value: data.password,
      onChange: event => setPassword(event.target.value)
    },
    reset: () => setData(inputs),
    data: () => data
  }
}
