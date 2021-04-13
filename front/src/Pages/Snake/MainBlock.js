import {useRef, useEffect, useState} from 'react'

import Menu from './Menu.js'

import Snake from './../../Games/Snake/Snake.js'

export default function MainBlock() {
  const [status, setStatus] = useState("menu")

  const canvas = useRef()
  let modal = <></>

  useEffect(() => {
    if (status === "menu") {
    } else if (status === "start play") {
      const snake = new Snake(canvas.current, 6, param => setStatus("end play"), param => console.log())
      snake.play()
      setStatus("playing")
    } else if (status === "playing") {
    } else if (status === "end play") {
      setStatus("menu")
    }
  }, [status])

  if (status === "menu") {
    modal = <Menu play={() => setStatus("start play")} />
  }

  return (
    <div className="separate__mainBlock box">
      <canvas className="game-canvas" ref={canvas}> </canvas>
      {modal}
    </div>
  )
}
