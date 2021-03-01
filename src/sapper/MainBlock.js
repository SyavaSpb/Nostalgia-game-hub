import React from 'react'

export default function MainBlock({ status, isAuthenticated, joinLobby, joinRandomRoom }) {

  let output
  if (status == "choose game mode") {
    output =
    <div className="mainBlock__menu box">
      <div className="mainBlock__button button-standart text-center">
        <span className="text-teletoon text-m text-white">Single player</span>
      </div>
      {isAuthenticated
        ? <div className="mainBlock__button button-standart text-center" onClick={joinLobby}>
            <span className="text-teletoon text-m text-white">Battle royal mode</span>
          </div>
        : <div className="text-center">
            <div className="mainBlock__button button-deactivate text-center" style={{marginBottom: '0'}}>
              <span className="text-teletoon text-m text-white">Battle royal mode</span>
            </div>
            <span className="text-teletoon text-s text-red"> login to play battle royale </span>
          </div>
      }
    </div>
  } else if (status == "connecting lobby") {
    output =
    <div className="mainBlock__menu box">
      <span className="text-teletoon text-m text-white tittle-center">Connecting to lobby...</span>
    </div>
  } else if (status == "join room") {
    output =
    <div className="mainBlock__menu box" onClick={joinRandomRoom}>
      <div className="mainBlock__button button-standart text-center">
        <span className="text-teletoon text-m text-white">Join random room</span>
      </div>
      <input />
      <div className="mainBlock__button button-standart text-center">
        <span className="text-teletoon text-m text-white">Join room by id</span>
      </div>
    </div>
  } else if (status == "connecting room") {
    output =
    <div className="mainBlock__menu box">
      <span className="text-teletoon text-m text-white tittle-center">Connecting to room...</span>
    </div>
  } else if (status == "customization room") {
    output =
    <div className="mainBlock__menu box">
      <span className="text-teletoon text-m text-white tittle-center">customization</span>
    </div>
  } else if (status == "game") {
    
    output =
    <div class="mainBlock__game board box">
      <canvas id="game"></canvas>
    </div>
  }

  return (
    <section className="mainBlock">
      {output}
    </section>
  )
}
