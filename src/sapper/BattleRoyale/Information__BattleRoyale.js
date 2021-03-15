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
  const {me, setMe, room, setRoom} = useBattleRoyaleContext()
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
  }

  return (
    <>
      { output }
    </>
  )
}
