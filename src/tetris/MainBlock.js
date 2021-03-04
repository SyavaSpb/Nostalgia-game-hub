import React, {useState, useRef, useEffect} from 'react'
import TetrisGame from './Tetris/Tetris.js'

export default function MainBlock({ status, setStatus }) {
  const canvasRef = useRef(null)
  const [game, setGame] = useState(null)

  function startGame() {
    setStatus("play")
  }

  useEffect(() => {
    if (game) {
      game.play()
    }
  }, [game])

  useEffect(() => {
    if (status == "play" && canvasRef.current && !game) {
      setGame(new TetrisGame(0, 0, canvasRef.current))
    }
  })

  let output, modal
  if (status == "custom") {
    output =
    <div className="mainBlock__menu">
      <div className="mainBlock__button button-standart" onClick={() => startGame()}>
        <span className=""> Play </span>
      </div>
    </div>
  } else if (status == "play") {
    output =
    <canvas ref={canvasRef} id="game">
    </canvas>
    modal =
    <div className="modal">
      <div className="modal__inner box">
      </div>
    </div>
  }
  return (
    <div className="mainBlock box">
      {output}
      // {modal}
    </div>
  )
}
