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
  const {me, setMe, room, setRoom} = useBattleRoyaleContext()
  const { joinLobby, joinRandomRoom, getRoominf, sendMove } =
    useGameRequests(HOST, PORT, setMe, setRoom)
  const requester = useRef(null)
  const [game, setGame] = useState(null)
  const canvasRef = useRef(null)
  const [move, setMove] = useState({})



  useEffect(() => {
    if (status[1] == "connecting lobby") {
      joinLobby(userData.login)
    } else if (status[1] == "joining random room") {
      joinRandomRoom(me)
    }
  }, [status])


  useEffect(() => {
    if (me.name && status[1] == "connecting lobby") {
      setStatus("def", "join room")
    } else if (me.roomid && status[1] == "joining random room") {
      setStatus("def", "joined room")
      requester.current = setInterval(() => getRoominf(me), 200)
    }
  }, [me])


  useEffect(() => {
    if (room.state == "game") {
      if (!game) {
        setGame(new Sapper(canvasRef.current, 8, setMove))
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
    <div> connecting to lobby... </div>

  } else if (status[1] == "join room") {

    output =
    <>
      <div> choose join room </div>
      <div
        className="button-standart"
        onClick={() => setStatus("def", "joining random room")}
      >
        random room
      </div>
      <div className="button-standart"> by id </div>
    </>

  } else if (status[1] == "joining random room") {

    output =
    <div> joining to room... </div>

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
