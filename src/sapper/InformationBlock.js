import React from 'react'

export default function InformationBlock({ status, isAuthenticated, userData, toggleReady, room}) {
  let output
  if (status == "customization room") {
    output =
    <div>
      <div className="box text-center">
        <span className="text-teletoon tittle-m text-orange">
          {userData.login}
        </span>
      </div>
      {room.players
        ? <div>
            <div className="box information__players">
              {room.players.map((player, index) => {
                let classes = "text-teletoon text-lighter text-m text-white"
                if (player.ready) {
                  classes += " back-orange"
                } else {
                  classes += " back-red"
                }
                return <h1
                       className = {classes}
                       key={player.id}>
                         {index + 1}. {player.name}
                       </h1>
                })}
            </div>
            <div className="box information__ready">
              <div className="button-standart text-center" onClick={toggleReady}>
                <span className="text-white"> ready! </span>
              </div>
            </div>
          </div>
        : <div></div>
      }
    </div>
  }
  else {
    if (isAuthenticated) {
      output =
      <div className="box text-center">
        <span className="text-teletoon tittle-m text-orange">
          {userData.login}
        </span>
      </div>
    } else {
      output =
      <a className="box text-clean" href="http://localhost:3000">
        <div className="button-standart">
          <span className="text-teletoon text-m text-white"> login </span>
        </div>
      </a>
    }
  }

  return (
    <aside className="information">
      {output}
    </aside>
  )
}
