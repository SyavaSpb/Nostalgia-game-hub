import React, {useState, useRef, useEffect} from 'react'
import СustomizationRoom from './СustomizationRoom'
import {Sapper} from './sapper.js'
import ReactDOMServer from 'react-dom/server';

export default function MainBlock({ status, isAuthenticated, joinLobby, joinRandomRoom, sendMove, room }) {
  const [game, setGame] = useState(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (status == "game" && canvasRef.current) {
      if (!game) {
        console.log("unit")
        setGame(new Sapper(canvasRef.current))
      }
      if (room.game.grid && game) {
        game.setGrid(room.game.grid)
        game.draw()
      } else {
        console.log("доска не найдена")
      }
    }
    if (status != "game" && game) {
      setGame(null)
    }
  })

  function move() {
    const x = event.pageX - event.target.getBoundingClientRect().left
    const y = event.pageY - event.target.getBoundingClientRect().top
    const cellSize = event.target.clientWidth / 8
    const i = Math.floor(y / cellSize)
    const j = Math.floor(x / cellSize)
    sendMove({x: j, y: i})
  }

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
    <СustomizationRoom />
  } else if (status == "game") {
    output =
    <div className="mainBlock__game board box">
      <canvas ref={canvasRef} id="game" onClick={(event) => move(event)}></canvas>
    </div>
  }

  return (
    <section className="mainBlock">
      {output}
    </section>
  )
}
