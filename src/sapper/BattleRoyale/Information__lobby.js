import React from 'react'

export default function Information__lobby({ room, toggleReady, me }) {

  return (
    <>
      <div className="box information__players">
        <div className="text-center text-teletoon text-l text-white"> Players: </div>
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

      {room.state == "wait"
        ? <div className="box information__ready">
            <div className="button-standart text-center"
              onClick={() => toggleReady(me)}
            >
              <span className="text-white"> ready! </span>
            </div>
          </div>
        : <></>
      }
    </>
  )
}
