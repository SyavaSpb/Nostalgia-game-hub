import React from 'react'

export default function Information__game({ room }) {
  return (
    <div className="box information__players">
      <div className="text-center text-teletoon text-l text-white"> Players: </div>
      {console.log(room.players)}
      {room.players.map((player, index) => {
        let classes = "text-teletoon text-lighter text-m text-white"
        if (player.isMove) {
          classes += " back-orange"
        } else if (player.isLoose) {
          classes += " back-red"
        }
        let isConnect = ""
        if (!player.isConnect) {
          isConnect = "dis"
        }
        return <h1 className={classes} key={player.id}>
          {index + 1}. {player.name} {player.moveTime} {isConnect}
        </h1>
      })}
    </div>
  )
}
