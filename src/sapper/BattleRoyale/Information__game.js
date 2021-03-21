import React from 'react'

export default function Information__game({ room }) {

  let watchers
  if (room.watchers.length) {
    watchers =
    <div className="box">
      <div className="text-center text-teletoon text-l text-white"> Watchers: </div>
      {console.log(room.watchers)}
      {room.watchers.map((player, index) => {
        let classes = "text-teletoon text-lighter text-m text-white"
        return <h1 className={classes} key={player.id + 100}>
          {index + 1}. {player.name}
        </h1>
      })}
    </div>
  }

  return (
    <div className="information__players">
      <div className="box">
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

      {watchers}
    </div>
  )
}
