import React from 'react'
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

  let output, players
  if (status[1] == "joined room") {
    if (room.players) {
      if (room.state == "wait") {
        players =
        <div className="box information__players">
          {room.players.map((player, index) => {
            let classes = "text-teletoon text-lighter text-m text-white"
            if (player.ready) {
              classes += " back-orange"
            } else {
              classes += " back-red"
            }
            return <h1 className={classes} key={player.id}>
                    {index + 1}. {player.name}
                   </h1>
          })}
        </div>
      } else if (room.state == "game") {
        players =
        <div className="box information__players">
          {room.players.map((player, index) => {
            let classes = "text-teletoon text-lighter text-m text-white"
            if (player.isMove) {
              classes += " back-orange"
            }
            if (player.isLoose) {
              classes += " back-red"
            }
            let active
            if (!player.isActive) {
              active = "dis"
            }
            return <h1 className={classes} key={player.id}>
                    {index + 1}. {player.name} {player.moveTime} {active}
                   </h1>
          })}
        </div>
      }

      output =
      <div className="box information__ready">
        <div className="button-standart text-center"
          onClick={() => toggleReady(me)}
        >
          <span className="text-white"> ready! </span>
        </div>
      </div>
    }
  }

  return (
    <>
      Information__BattleRoyale
      {players}
      {output}
    </>
  )
}
