import React, {useState, useRef, useEffect} from 'react'

import Header from '../components/header'
import MainBlock from './MainBlock'

import {useAuth} from '../hooks/useAuth'
import useForceUpdate from '../hooks/useForceUpdate'

import TetrisGame from './Tetris/Tetris.js'

export default function App() {
  const [status, setStatus] = useState("custom")

  return (
    <div className="container">
      <Header title={"tetris"}/>
      <div className="separate">
        <div className="information box"></div>
        <MainBlock status={status} setStatus={setStatus} />
      </div>
    </div>
  )
}
