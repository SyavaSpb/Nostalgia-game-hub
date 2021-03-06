import React, {useState, useEffect} from 'react'
import useForm from './useForm'

export default function Auth__form({ onLogin, onReg }) {
  const form = useForm({ login: "", password: "" })
  const [authLog, setAuthLog] = useState(" ")

  return (
    <form className="box auth" onSubmit={() => event.preventDefault()}>
      <div className="auth__item">
        <span className="text-teletoon text-white"> Login: </span>
        <input className="text-teletoon input-standart text-s" type="text" {...form.login}/>
      </div>

      <div className="auth__item">
        <span className="text-teletoon text-white"> Password: </span>
        <input className="text-teletoon input-standart text-s" type="password" {...form.password}/>
      </div>

      <span className="text-teletoon text-red"> {authLog} </span>

      <div className="buttons auth__item">
        <button
          type="submit"
          className="button-standart text-teletoon buttons__item"
          onClick={() => onLogin(form.data()).then(log => setAuthLog(log))}
        >
          Login
        </button>
        <button
          type="submit"
          className="button-standart text-teletoon buttons__item"
          onClick={() => onReg(form.data()).then(log => setAuthLog(log))}
        >
          Reg
        </button>
      </div>
    </form>
  )
}
