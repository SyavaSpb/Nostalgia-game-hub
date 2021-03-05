import React, {useState, useRef, useEffect} from 'react'
import SnakeGame from './SnakeEngine/SnakeGame.js'

export default function MainBlock({ status, setStatus, setScore }) {
  const canvasRef = useRef(null)
  const [game, setGame] = useState(null)
  const [lastScore, setLastScore] = useState(null)

  function goToMenu() {
    setStatus("custom")
  }

  function startGame() {
    setStatus("play")
    setGame(new SnakeGame(canvasRef.current))
  }

  useEffect(() => {
    if (game) {
      game.play()
    }
  }, [game])

  let output, canvas, modal
  if (status == "custom") {
    canvas =
    <canvas ref={canvasRef} id="game">
    </canvas>
    modal =
    <div className="modal">
      <div className="modal__inner box">
        <div className="button-standart" onClick={() => startGame()}>
          <span> play </span>
        </div>
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
