import React, {useState, useRef, useEffect} from 'react'
import {Sapper} from './sapper.js'
import {useStatusContext} from './StatusContext'

import MainBlock__ChooseMode from './MainBlock__ChooseMode'
import MainBlock__Single from './single/MainBlock__Single'
import MainBlock__BattleRoyale from './BattleRoyale/MainBlock__BattleRoyale'

export default function MainBlock_sapper() {
  const { status, setStatus } = useStatusContext()

  let output
  if (status[0] == "choose mode") {
    output = <MainBlock__ChooseMode />
  } else if (status[0] == "single mode") {
    output = <MainBlock__Single />
  } else if (status[0] == "battle royale mode") {
    output = <MainBlock__BattleRoyale />
  } else {

  }

  return (
    <section className="mainBlock box">
      {output}
    </section>
  )
}
