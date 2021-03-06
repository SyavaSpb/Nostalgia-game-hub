import React, {useState, useRef, useEffect} from 'react'

import Header from '../components/header'
import MainBlock from './MainBlock'
import InformationBlock from './InformationBlock'

import { AuthProvider } from './../components/Auth/AuthContext'

import './tetris.css'

export default function App() {
  const [status, setStatus] = useState("custom")
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)

  return (
    <div className="container container-tetris">
      <Header title={"tetris"}/>
      <div className="separate">
        <AuthProvider>
          <InformationBlock
            score={score}
            status={status}
            level={level}
          />
          <MainBlock
          status={status}
          setStatus={setStatus}
          setScore={setScore}
          levelState={{level, setLevel}}
          score={score}
          />
        </AuthProvider>
      </div>
    </div>
  )
}
