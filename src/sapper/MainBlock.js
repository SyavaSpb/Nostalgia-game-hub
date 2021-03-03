import React, {useState, useRef, useEffect} from 'react'
import СustomizationRoom from './СustomizationRoom'
import {Sapper} from './sapper.js'
import ReactDOMServer from 'react-dom/server';
import useForceUpdate from '../hooks/useForceUpdate'

export default function MainBlock({
  status, isAuthenticated,
  joinLobby, joinRandomRoom,
  serverMove, grid,
  openSingleMode, startSingleGame,
  property
}) {
  const [game, setGame] = useState(null)
  const canvasRef = useRef(null)
  const {forceUpdate} = useForceUpdate()

  useEffect(() => {
    if ((status == "game" || status == "single game") && canvasRef.current) {
      if (!game) {
        console.log("unit")
        setGame(new Sapper(canvasRef.current, property.graphic.cellsPerLine))
      } else if (grid) {
        game.setGrid(grid)
        game.draw()
      } else {
        console.log("доска не найдена")
      }
    }
    if ((status != "game" && status != "single game") && game) {
      console.log("clear")
      setGame(null)
    }
  })

  function move(event) {
    event.preventDefault()
    const x = event.pageX - event.target.getBoundingClientRect().left
    const y = event.pageY - event.target.getBoundingClientRect().top
    const cellSize = event.target.clientWidth / property.graphic.cellsPerLine
    const i = Math.floor(y / cellSize)
    const j = Math.floor(x / cellSize)

    let rightBrn
    if (event.wich) {
      rightBrn = event.which == 3
    }
    else if (event.button) {
      rightBrn = event.button == 2
    }

    if (rightBrn) {
      game.toggleFlag(i, j)
      game.draw()
      forceUpdate()
    } else {
      serverMove(i, j)
    }
  }

  let output
  if (status == "choose game mode") {
    output =
    <div className="mainBlock__menu box">

      <div className="mainBlock__button button-standart text-center"
           onClick={() => openSingleMode()}
      >
        <span className="text-teletoon text-m text-white">Single player</span>
      </div>

      {isAuthenticated
        ? <div className="mainBlock__button button-standart text-center" onClick={joinLobby}>
            <span className="text-teletoon text-m text-white">Battle royal mode</span>
          </div>
        : <div className="text-center">
            <div className="mainBlock__button button-deactivate text-center" style={{marginBottom: '0'}}>
              <span className="text-teletoon text-m text-white">Battle royal mode</span>
            </div>
            <span className="text-teletoon text-s text-red"> login to play battle royale </span>
          </div>
      }

    </div>
  } else if (status == "customization single game") {
    output =
    <div className="mainBlock__menu box">
      <div> choose size of board </div>
      <div className="mainBlock__boardSizes">
        <div
          className="mainBlock__boardSize text-center text-teletoon text-m text-white back-orange"
          // onClick={() => setConfigurationGame(Object.assign(configurationGame, {
          //   sizeBorad: [8, 10, 10]
          // }))}
        >
          10 * 8 <br/> 10 mines
        </div>
        <div
          className="mainBlock__boardSize text-center text-teletoon text-m text-white"
          // onClick={() => setConfigurationGame(Object.assign(configurationGame, {
          //   sizeBorad: [14, 18, 40]
          // }))}
        >
          18 * 14 <br/> 40 mines
        </div>
        <div
          className="mainBlock__boardSize text-center text-teletoon text-m text-white"
          // onClick={() => setConfigurationGame(Object.assign(configurationGame, {
          //   sizeBorad: [24, 20, 99]
          // }))}
        >
          24 * 20 <br/> 99 mines
        </div>
      </div>
      <div
        className="mainBlock__button button-standart text-center"
        onClick={() => startSingleGame()}
      >
        <span className="text-teletoon text-m text-white">Play</span>
      </div>
    </div>
  } else if (status == "single game") {
    output =
    <div className="mainBlock__game board box">
      <canvas
        ref={canvasRef}
        id="game"
        onMouseDown={() => move(event)}
        onContextMenu={() => event.preventDefault()}
      >
      </canvas>
    </div>
  } else if (status == "connecting lobby") {
    output =
    <div className="mainBlock__menu box">
      <span className="text-teletoon text-m text-white tittle-center">Connecting to lobby...</span>
    </div>
  } else if (status == "join room") {
    output =
    <div className="mainBlock__menu box" onClick={joinRandomRoom}>
      <div className="mainBlock__button button-standart text-center">
        <span className="text-teletoon text-m text-white">Join random room</span>
      </div>
      <input />
      <div className="mainBlock__button button-standart text-center">
        <span className="text-teletoon text-m text-white">Join room by id</span>
      </div>
    </div>
  } else if (status == "connecting room") {
    output =
    <div className="mainBlock__menu box">
      <span className="text-teletoon text-m text-white tittle-center">Connecting to room...</span>
    </div>
  } else if (status == "customization room") {
    output =
    <СustomizationRoom />
  } else if (status == "game") {
    output =
    <div className="mainBlock__game board box">
      <canvas
        ref={canvasRef}
        id="game"
        onMouseDown={() => move(event)}
        onContextMenu={() => event.preventDefault()}
      ></canvas>
    </div>
  }

  return (
    <section className="mainBlock">
      {output}
    </section>
  )
}
