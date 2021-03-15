import React from 'react'
import {useStatusContext} from './StatusContext'
import {useAuthContext} from './../components/Auth/AuthContext'

import config from './../../config.json'
const MODE = config.mode
const PORT = config.port
const HOST = config.host
let hrefMenu = "http://" + HOST
if (MODE == "development") {
  hrefMenu += ":"
  hrefMenu += PORT
}

export default function MainBlock__ChooseMode({ openSingleMode, openBattleRoyaleMode}) {
  const { status, setStatus } = useStatusContext()
  const { token } = useAuthContext()
  const isAuthenticated = token != null


  let singleButton =
    <div className="menu__item button-standart text-center"
      onClick={ () => setStatus("single mode") }
    >
      <span className="text-teletoon text-l text-white"> Single player </span>
    </div>


  let battleRoyaleButton
  if (isAuthenticated) {
    battleRoyaleButton =
      <div className="menu__item button-standart text-center"
        onClick={ () => setStatus("battle royale mode", "connecting lobby") }
      >
        <span className="text-teletoon text-l text-white">Battle royal mode</span>
      </div>
  } else {
    battleRoyaleButton =
      <div className="menu__item text-center">
        <div className="button-deactivate text-center">
          <span className="text-teletoon text-l text-white">Battle royal mode</span>
        </div>
        <span className="text-teletoon text-s text-red"> login to play battle royale </span>
      </div>
  }

  let toMenuButton =
  <div className="menu__item button-standart text-center">
    <a className="text-clean" href={hrefMenu}>
      <span className="text-teletoon text-l text-white"> Menu </span>
    </a>
  </div>


  return (
    <div className="menu">
      { singleButton }
      { battleRoyaleButton }
      { toMenuButton }
    </div>
  )
}
