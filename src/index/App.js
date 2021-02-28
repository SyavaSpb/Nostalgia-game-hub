import React, {useState} from 'react'
import Header from '../components/header'
import Auth from './Auth'
const config = require('../../config.json')

function useServerRequest(method, url, body = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.responseType = 'text'
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = function() {
      resolve(xhr.response)
    }
    xhr.send(JSON.stringify(body))
  })
}

export default function App() {
  const PORT = config.port
  const HOST = config.host
  const [authLog, setAuthLog] = useState('')
  const [isActiveAuth, setActiveAuth] = useState(true)

  function onReg(data) {
    setActiveAuth(false)
    useServerRequest('POST', "http://" + HOST + ":" + PORT + "/auth/reg", data)
      .then(serverLog => {
        setActiveAuth(true)
        setAuthLog(serverLog)
      })
  }
  function onLogin(data) {
    setActiveAuth(false)
    useServerRequest('POST', "http://" + HOST + ":" + PORT + "/auth/login", data)
      .then(serverLog => {
        setActiveAuth(true)
        setAuthLog(serverLog)
      })
  }

  return (
    <div className="container">

      <Header title={"Nostalgic games hub"} />

      <div className="separate">

        <aside className="authorization">
          <Auth onReg={onReg} onLogin={onLogin} authLog={authLog} isActive={isActiveAuth}/>
        </aside>


        <section className="games">
          <a className="games__item games__item-tetris box text-clean" href="tetris">
            <span className="games__tittle tittle-l text-pixel text-up text-orange">tetris</span>
          </a>
          <a className="games__item games__item-snake box text-clean" href="snake">
            <span className="games__tittle tittle-l text-pixel text-up text-orange">snake</span>
          </a>
          <a className="games__item games__item-sapper box text-clean" href="sapper">
            <span className="games__tittle tittle-l text-pixel text-up text-orange">sapper</span>
          </a>
        </section>

      </div>

    </div>
  )
}
