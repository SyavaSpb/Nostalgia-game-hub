import React from 'react'

import Information__lobby from './Information__lobby'
import Information__game from './Information__game'

import {useStatusContext} from './../StatusContext'
import {useBattleRoyaleContext} from './BattleRoyaleContext'
import useGameRequests from './useGameRequests'

import config from './../../../config.json'
const HOST = config.host
const PORT = config.port

export default function Information__BattleRoyale() {
  const { status, setStatus } = useStatusContext()
  const {me, setMe, room, setRoom, lobby} = useBattleRoyaleContext()
  const {toggleReady} = useGameRequests(HOST, PORT, setMe, setRoom)

  let output
  if (status[1] == "joined room") {
    if (room.state == "wait") {
      output =
      <Information__lobby
        room={room}
        toggleReady={toggleReady}
        me={me}
      />
    } else if (room.state == "game") {
      output =
      <Information__game
        room={room}
      />
    }
  } else if (status[1] == "join room") {
    if (lobby.amoungPlayers) {
      output =
      <>
        <div className="box information__item">
          <div className="text-teletoon text-l text-center text-white"> Lobby </div>
          <div className="records__item">
            <span className="text-teletoon text-m text-white">Players: </span>
            <span className="text-teletoon text-l text-white">{lobby.amoungPlayers}</span>
          </div>
          <div className="records__item">
            <span className="text-teletoon text-m text-white">Rooms: </span>
            <span className="text-teletoon text-l text-white">{lobby.amoungRooms}</span>
          </div>
        </div>
      </>
    }
  }

  return (
    <>
      { output }
    </>
  )
}
