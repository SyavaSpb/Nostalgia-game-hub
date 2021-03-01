import React from 'react'
import {useAuth} from '../index/useAuth'
import Header from '../components/header'
import MainBlock from './MainBlock'

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
  const { userData, token } = useAuth()
  const isAuthenticated = token != null

  function joinLobby() {
    console.log('lobby')
    // useServerRequest('POST', "http://" + HOST + ":" + PORT + "/gameRequest/joinlobby", userData)
    //   .then(data => {
    //
    //   })
  }

  function joinRoom() {
    console.log('room')
    // useServerRequest('POST', "http://" + HOST + ":" + PORT + "/gameRequest/joinroom", userData)
    //   .then(data => {
    //
    //   })
  }

  return (
    <div className="container">

      <Header title={"sapper"}/>

      <div className="separate">

        <aside className="information">
          {isAuthenticated
            ? <div className="box">
                <span className="text-teletoon text-m text-orange">
                  {userData.login}
                </span>
              </div>
            : <a className="box text-clean" href="http://localhost:3000">
                <div className="button-standart">
                  <span className="text-teletoon text-m text-white"> login </span>
                </div>
              </a>
          }
        </aside>


        <MainBlock isAuthenticated={isAuthenticated} />

      </div>

    </div>
  )
}
