import React, {useState} from 'react'

const styles = {
  auth: {
    padding: '7px'
  },
  buttons: {
    display: 'flex',
  },
  buttons__item: {
    width: '50%'
  },
  input: {
    width: '100%'
  }
}

function useForm(inputs) {
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

export default function Auth({onReg, onLogin, authLog, isActive}) {
  const form = useForm({
    login: "",
    password: ""
  })

  function doAuth(event) {
    event.preventDefault()
  }

  function onClickReg() {
    onReg(form.data())
  }
  function onClickLogin() {
    onLogin(form.data())
  }

  return (
    <form className="box" style={styles.auth} onSubmit={doAuth}>
      <div>
        <span className="text-teletoon text-white"> Login: </span>
        <input className="text-teletoon" type="text" style={styles.input} {...form.login}/>
        <span className="text-teletoon text-white"> Password: </span>
        <input className="text-teletoon" type="password" style={styles.input} {...form.password}/>
        <span className="text-teletoon text-red"> {authLog} </span>
      </div>
      <div className="buttons" style={styles.buttons}>
        <button
          type="submit"
          className="text-teletoon"
          style={styles.buttons__item}
          onClick={onClickLogin}
        >
          Login
        </button>
        <button
          type="submit"
          className="text-teletoon"
          style={styles.buttons__item}
          onClick={onClickReg}
        >
          Reg
        </button>
      </div>
    </form>
  )
}












//
