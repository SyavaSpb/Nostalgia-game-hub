import React from 'react'
import {useAuth} from '../index/useAuth'
import Header from '../components/header'

export default function App() {
  const { login, logout, userData, token } = useAuth()
  const isAuthenticated = token != null
  return (
    <div class="container">

      <Header title={"sapper"}/>

      <div class="separate">

        <aside class="information">
          {isAuthenticated
            ? <div class="information__profile box">
                <span class="information__nickname text-teletoon text-m text-orange"> {userData.login} </span>
              </div>
            : <div class="information__profile box">
                <span class="information__nickname text-teletoon text-m text-orange"> login </span>
              </div>
          }
          <div class="information__profile box hide">
            <span class="information__nickname text-teletoon text-m text-orange"> nickname </span>
          </div>

          <div class="information__players box hide">
          </div>
        </aside>


        <section class="mainBlock">
          <div class="mainBlock__auth box hide">
            <span class="text-m text-orange text-teletoon"> Enter your nickname: </span>
            <input class="mainBlock__inputName text-teletoon" type="text" value="syavaspb" />
            <div class="mainBlock__buttonAuth button">
              <span class="button__text text-teletoon text-m text-white"> Save nickname </span>
            </div>
          </div>

          <div class="mainBlock__joinRoom box hide">
            <div class="mainBlock__buttonJoin button">
              <span class="button__text text-teletoon text-m text-white"> Join room </span>
            </div>
          </div>

          <div class="mainBlock__ready box hide">
            <div class="mainBlock__buttonReady button mainBlock__buttonReady-no">
              <span class="button__text text-teletoon text-m text-white"> Ready </span>
            </div>
          </div>

          <div class="mainBlock__game board box hide">
            <canvas id="game"></canvas>
          </div>

        </section>

      </div>

    </div>
  )
}
