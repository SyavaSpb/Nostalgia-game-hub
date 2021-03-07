import React, {useState, useEffect} from 'react'
import Auth from './../components/Auth/Auth'
import Information__BattleRoyale from './BattleRoyale/Information__BattleRoyale'
import Information__Single from './single/Information__Single'
import {useAuthContext} from './../components/Auth/AuthContext'
import {useStatusContext} from './StatusContext'

export default function Information_sapper() {
  const { userData, token } = useAuthContext()
  const isAuthenticated = token != null
  const { status, setStatus } = useStatusContext()

  let output
  if (status[0] == "single mode") {
    output = <Information__Single />
  } else if (status[0] == "battle royale mode") {
    output = <Information__BattleRoyale />
  }

  return (
    <aside className="information">
      <Auth />
      {output}
    </aside>
  )
}
