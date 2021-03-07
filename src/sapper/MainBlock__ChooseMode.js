import React from 'react'
import {useStatusContext} from './StatusContext'
import {useAuthContext} from './../components/Auth/AuthContext'

export default function MainBlock__ChooseMode({ openSingleMode, openBattleRoyaleMode}) {
  const { status, setStatus } = useStatusContext()
  const { token } = useAuthContext()
  const isAuthenticated = token != null
  return (
    <div className="menu box">

      <div className="menu__item button-standart text-center"
        onClick={ () => setStatus("single mode") }
      >
        <span className="text-teletoon text-m text-white">Single player</span>
      </div>

      {isAuthenticated
        ? <div className="menu__item button-standart text-center"
            onClick={ () => setStatus("battle royale mode", "connecting lobby") }
          >
            <span className="text-teletoon text-m text-white">Battle royal mode</span>
          </div>
        : <div className="menu__item text-center">
            <div className="button-deactivate text-center">
              <span className="text-teletoon text-m text-white">Battle royal mode</span>
            </div>
            <span className="text-teletoon text-s text-red"> login to play battle royale </span>
          </div>
      }
    </div>
  )
}
