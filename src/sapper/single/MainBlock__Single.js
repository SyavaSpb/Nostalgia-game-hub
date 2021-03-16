import React, {useState, useRef, useEffect} from 'react'
import { useStatusContext } from './../StatusContext'
import { useAuthContext } from './../../components/Auth/AuthContext'
import useRecords from './../../hooks/useRecords'

import {Sapper} from './../sapper'
import SupperGame from '../../../server/SupperServer'

import config from './../../../config.json'
const MODE = config.mode
const PORT = config.port
const HOST = config.host
let hrefMenu = "http://" + HOST
if (MODE == "development") {
  hrefMenu += ":"
  hrefMenu += PORT
}

export default function MainBlock__Single() {
  const { userData, token } = useAuthContext()
  const isAuthenticated = token != null
  const { status, setStatus } = useStatusContext()
  const canvasRef = useRef(null)
  const [game, setGame] = useState(null)
  const [localServer, setLocalServer] = useState(null)
  const {updateRecords} = useRecords()
  const [property, setProperty] = useState([8, 10, 10])
  const [move, setMove] = useState({})

  function openModal(record = null) {
    if (record !== null && isAuthenticated) {
      const key = property.join("*")
      const records = {
        sapper: {
          [key]: this.score
        }
      }
      // updateRecords(userData, records)
      //   .then(() => setStatus("single mode", "custom"))
    } else {
      setStatus("single mode", "custom")
    }
  }

  function startGame() {
    setStatus("single mode", "play")
    setLocalServer(new SupperGame(...property))
    setGame(new Sapper(
      canvasRef.current,
      property[0],
      setMove
    ))
  }

  useEffect(() => {
    if (localServer && game) {
      game.setGrid(localServer.forClient().grid)
      game.draw()
      // localServer.play()
    }
  }, [localServer, game])

  useEffect(() => {
    if (status[1] == "play") {
      // console.log(move)
      const moveLog = localServer.move(move.i, move.j)
      game.setGrid(localServer.forClient().grid)
      game.draw()
      if (localServer.isEnd() || moveLog == "mine") {
        setStatus("def", "custom")
      }
    }
  }, [move])

  let canvas, modal
  canvas =
  <canvas ref={canvasRef} id="game">
  </canvas>
  if (status[1] == "custom") {
    modal =
    <div className="modal">
      <div className="modal__inner menu box text-center">
        <div className="menu__item">
          <div className="mainBlock__boardSizes">
            <div
              className={"mainBlock__boardSize text-center text-teletoon text-m text-white" +
                (property[0] == 8 ? " back-orange" : "")}
              onClick={() => setProperty([8, 10, 10])}
            >
              10 * 8 <br/> 10 mines
            </div>
            <div
              className={"mainBlock__boardSize text-center text-teletoon text-m text-white" +
                (property[0] == 14 ? " back-orange" : "")}
              onClick={() => setProperty([14, 18, 40])}
            >
              18 * 14 <br/> 40 mines
            </div>
            <div
              className={"mainBlock__boardSize text-center text-teletoon text-m text-white" +
                (property[0] == 20 ? " back-orange" : "")}
              onClick={() => setProperty([20, 24, 99])}
            >
              24 * 20 <br/> 99 mines
            </div>
          </div>
        </div>
        <div
          className="menu__item button-standart text-center"
          onClick={() => startGame()}
        >
          <span className="text-teletoon text-m text-white">Play</span>
        </div>
        <a
          className="menu__item button-standart text-clean text-center"
          href={hrefMenu}
        >
          <span className="text-teletoon text-m text-white">Menu</span>
        </a>
      </div>
    </div>
  }


  return (
    <>
      {canvas}
      {modal}
    </>
  )
}
