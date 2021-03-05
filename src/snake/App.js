import React, {useState, useRef, useEffect} from 'react'

import Header from '../components/header'
import MainBlock from './MainBlock'
import InformationBlock from './InformationBlock'

import {useAuth} from '../hooks/useAuth'
import useForceUpdate from '../hooks/useForceUpdate'

export default function App() {
  const [status, setStatus] = useState("custom")
  const [score, setScore] = useState(0)

  return (
    <div className="container">
      <Header title={"tetris"}/>
      <div className="separate">
        <InformationBlock
          score={score}
          status={status}
        />
        <MainBlock
          status={status}
          setStatus={setStatus}
          setScore={setScore}
        />
      </div>
    </div>
  )
}
