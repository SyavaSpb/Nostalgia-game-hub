import React, {useState, useRef, useEffect} from 'react'

import Header from '../components/header'
import MainBlock from './MainBlock'
import InformationBlock from './InformationBlock'

import SupperGame from '../../server/SupperServer'

// import {useAuth} from '../hooks/useAuth'
// import useServerRequest from '../hooks/useServerRequest'
import useForceUpdate from '../hooks/useForceUpdate'
import useGameRequests from './multiplayer/useGameRequests'

const cloneDeep = require('lodash.clonedeep');
const config = require('../../config.json')

export default function App() {
  const PORT = config.port
  const HOST = config.host
  // const { userData, token } = useAuth()
  const isAuthenticated = token != null
  const [status, setStatus] = useState("choose game mode")
  const [room, setRoom] = useState({})
  const [me, setMe] = useState({})
  const requester = useRef()
  const { forceUpdate } = useForceUpdate()
  // const { serverRequest } = useServerRequest()
  const {
    joinLobby,
    joinRandomRoom,
    getRoominf,
    toggleReady,
    sendMove
  } = useGameRequests(HOST, PORT, setStatus, setMe, setRoom)
  const [grid, setGrid] = useState(null)
  const [localServer, setLocalServer] = useState(null)
  const [property, setProperty] = useState({
    sapperProperty: [8, 10, 10],
    graphic: {
      cellsPerLine: 8
    }
  })

  function openSingleMode() {
    setStatus("customization single game")
    setLocalServer(null)
  }

  function startSingleGame() {
    setStatus("single game")
    setLocalServer(new SupperGame(...property.sapperProperty))
  }

  function serverMove(i, j) {
    if (localServer) {
      const res = localServer.move(i, j)
      setGrid(localServer.forClient().grid)
    } else {
      sendMove(me, {x: j, y: i})
      setGrid(room.game.grid)
    }
    forceUpdate()
  }

  useEffect(() => {
    if (status == "single game") {
      setGrid(localServer.forClient().grid)
    } else if (status == "game") {
      setGrid(room.game.grid)
    } else {
      setGrid(null)
    }
  }, [room, localServer])

  useEffect(() => {
    if (status == "customization room") {
      clearInterval(requester.current)
      requester.current = setInterval(() => getRoominf(me, room, status, setGrid), 200)
    } else if (status == "game") {
      clearInterval(requester.current)
      requester.current = setInterval(() => getRoominf(me, room, status, setGrid), 200)
    }
  }, [status])

  return (
    <div className="container">
      <Header title={"sapper"}/>
      <div className="separate">
        <InformationBlock
          isAuthenticated={isAuthenticated}
          status={status}
          userData={userData}
          toggleReady={() => toggleReady(me)}
          room={room}
        />

        <MainBlock
          isAuthenticated={isAuthenticated}
          status={status}
          joinLobby={() => joinLobby(me, userData.login)}
          joinRandomRoom={() => joinRandomRoom(me)}
          sendMove={(pos) => sendMove(me, pos)}
          openSingleMode={openSingleMode}
          startSingleGame={startSingleGame}
          grid={grid}
          serverMove={serverMove}
          property={property}
        />
      </div>
    </div>
  )
}
