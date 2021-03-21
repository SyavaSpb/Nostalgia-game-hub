import React, {useEffect, useState, useRef} from 'react'
import {useStatusContext} from './../StatusContext'
import {useAuthContext} from './../../components/Auth/AuthContext'
import {useBattleRoyaleContext} from './BattleRoyaleContext'
import useGameRequests from './useGameRequests'

import {Sapper} from './../sapper'

import config from './../../../config.json'
const HOST = config.host
const PORT = config.port

export default function MainBlock__BattleRoyale() {
  const { status, setStatus } = useStatusContext()
  const { userData, token } = useAuthContext()
  const isAuthenticated = token != null
  const {me, setMe, room, setRoom, setLobby} = useBattleRoyaleContext()
  const { joinLobby, joinRandomRoom, getRoominf, sendMove, lobbyInf } =
    useGameRequests(HOST, PORT, setMe, setRoom)
  const requester = useRef(null)
  const lobbyRequester = useRef(null)
  const [game, setGame] = useState(null)
  const canvasRef = useRef(null)
  const [move, setMove] = useState({})



  useEffect(() => {
    clearInterval(lobbyRequester.current)
    if (status[1] == "connecting lobby") {
      joinLobby(userData.login)
    } else if (status[1] == "join room") {
      lobbyInf(me, setLobby)
      lobbyRequester.current = setInterval(() => lobbyInf(me, setLobby), 2000)
    } else if (status[1] == "joining random room") {
      joinRandomRoom(me)
      console.log("joining")
    }
  }, [status])


  useEffect(() => {
    if (me.name && status[1] == "connecting lobby") {
      setStatus("def", "join room")
    }
    if (me.roomid >= 100 && status[1] != "joined room") {
      setStatus("def", "joined room")
      requester.current = setInterval(() => getRoominf(me), 200)
      console.log("joined")
    }
  }, [me])


  useEffect(() => {
    if (room.state == "game") {
      if (!game) {
        setGame(new Sapper(canvasRef.current, 14, setMove))
      } else {
        game.setGrid(room.game.grid)
        game.draw()
      }
    } else if (room.state == "wait") {
      setGame(null)
    }
  }, [room])



  useEffect(() => {
    if (room.state == "game") {
      sendMove(me, move)
    }
  }, [move])



  let output
  if (status[1] == "connecting lobby") {

    output =
    <div className="menu">
      <div className="menu__item text-center">
        <span className="text-teletoon tittle-m text-white">
          connecting to lobby...
        </span>
      </div>
    </div>

  } else if (status[1] == "join room") {

    output =
    <div className="menu">
      <div
        className="menu__item button-standart text-center"
      >
        <span className="text-teletoon text-l text-white">
          new room
        </span>
      </div>
      <div
        className="menu__item button-standart text-center"
        onClick={() => setStatus("def", "joining random room")}
      >
        <span className="text-teletoon text-l text-white">
          join random room
        </span>
      </div>
      <div className="menu__item">
        <input
          className="input-standart input-roomid text-teletoon input-standart text-m"
          type="text"
          placeholder="Enter room id..."
        />
        <div className="button-standart text-center">
          <span className="text-teletoon text-l text-white">
            join room by id
          </span>
        </div>
      </div>
      <div
        className="menu__item button-standart text-center"
      >
        <span className="text-teletoon text-l text-white">
          menu
        </span>
      </div>
    </div>

  } else if (status[1] == "joining random room") {

    output =
    <div className="menu">
      <div className="menu__item text-center">
        <span className="text-teletoon tittle-m text-white">
          joining to room...
        </span>
      </div>
    </div>

  } else if (status[1] == "joined room") {

    if (room.state == "wait") {
      output =
      <div> joined to room </div>
    } else if (room.state == "game") {
      output =
      <canvas ref={canvasRef} id="game">
      </canvas>
    }

  }


  return (
    <>
      {output}
    </>
  )
}
