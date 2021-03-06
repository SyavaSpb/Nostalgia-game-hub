import React, {useState, useRef, useEffect} from 'react'
import TetrisGame from './TetrisEngine/TetrisGame.js'
import Slider from './../components/Slider'
import { useAuthContext } from './../components/Auth/AuthContext'
import useRecords from './../hooks/useRecords'

export default function MainBlock({ status, setStatus, setScore, levelState }) {
  const { userData, token } = useAuthContext()
  const isAuthenticated = token != null
  const canvasRef = useRef(null)
  const [game, setGame] = useState(null)
  const [lastScore, setLastScore] = useState(null)
  const {level, setLevel} = levelState
  const {updateRecords} = useRecords()

  function goToMenu(record = null) {
    if (record !== null && isAuthenticated) {
      const records = { tetris: record }
      updateRecords(userData, records)
        .then(() => setStatus("custom"))
    } else {
      setStatus("custom")
    }
  }

  function startGame() {
    setStatus("play")
    setGame(new TetrisGame(0, 0, canvasRef.current, level, goToMenu, setScore))
  }

  useEffect(() => {
    if (game) {
      game.play()
      setScore(0)
    }
  }, [game])

  let output, canvas, modal
  if (status == "custom") {
    canvas =
    <canvas ref={canvasRef} id="game">
    </canvas>

    modal =
    <div className="modal">
      <div className="modal__inner menu box text-center">
        <div className="text-center menu__item">
          <span className="text-teletoon text-m text-white"> level: </span>
          <span className="text-teletoon text-l text-white"> {level} </span>
          <Slider
            setValue={setLevel}
            value={level}
            partAmoung={6}
            minValue={1}
          />
        </div>
        <div className="button-standart text-center menu__item" onClick={() => startGame()}>
          <span className="text-teletoon text-l text-white"> play </span>
        </div>
        <a className="text-clean" href="http://localhost:3000">
          <div className="button-standart text-center menu__item">
            <span className="text-teletoon text-l text-white"> go to menu </span>
          </div>
        </a>
      </div>
    </div>
  } else if (status == "play") {
    canvas =
    <canvas ref={canvasRef} id="game">
    </canvas>
  }
  return (
    <div className="mainBlock box">
      {output}
      {canvas}
      {modal}
    </div>
  )
}
