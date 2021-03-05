import React, {useState, useEffect} from 'react'
import useForm from './useForm'

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

export default function Auth__form({ onLogin, onReg }) {
  const form = useForm({ login: "", password: "" })
  const [authLog, setAuthLog] = useState(' ')

  useEffect(() => {
    console.log(authLog)
  }, [authLog])

  return (
    <form className="box" style={styles.auth} onSubmit={() => event.preventDefault()}>
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
          className="button-standart text-teletoon"
          style={styles.buttons__item}
          onClick={() => setAuthLog(onLogin(form.data()))}
        >
          Login
        </button>
        <button
          type="submit"
          className="button-standart text-teletoon"
          style={styles.buttons__item}
          onClick={() => onReg(form.data()).then(log => setAuthLog(log))}
        >
          Reg
        </button>
      </div>
    </form>
  )
}
