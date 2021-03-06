import Board from 'cell-games-front/Board.js'
import {Controller} from 'cell-games-front/Controller.js'
import GameObject from 'cell-games-front/GameObject.js'
import {Graphic} from 'cell-games-front/Graphic.js'

import Food from './Food.js'
import SnakeBody from './SnakeBody.js'

const cloneDeep = require('lodash.clonedeep')

const blockImages = new Array()
import yellow_block_src from '../../assets/yellow_block.png'
blockImages.push(new Image())
blockImages[0].src = './' + yellow_block_src.toString()
import brawn_block_src from '../../assets/brawn_block.png'
blockImages.push(new Image())
blockImages[1].src = './' + brawn_block_src.toString()
import light_block_src from '../../assets/light_block.png'
blockImages.push(new Image())
blockImages[2].src = './' + light_block_src.toString()
import green_block_src from '../../assets/green_block.png'
blockImages.push(new Image())
blockImages[3].src = './' + green_block_src.toString()
import orange_block_src from '../../assets/orange_block.png'
blockImages.push(new Image())
blockImages[4].src = './' + orange_block_src.toString()

export default class Snake {
  constructor(canvas, level, _goToMenu, _setScore) {
    this.board = new Board(16, 24)

    this.map = this.initMap()
    this.board.addGameObject(this.map)

    this.snakeBody = new SnakeBody({i: 12, j: 8}, blockImages[1], blockImages[2])
    this.board.addGameObject(this.snakeBody)

    this.setFood()

    this.graphic = new Graphic(canvas, 16)

    this.score = 0
    this.level = level
    this.freq = (8 - level) * 50

    this._goToMenu = _goToMenu
    this._setScore = _setScore

    this.draw()
  }

  setFood() {
    this.food = new Food(this.board.randomFreeCell(), blockImages[3])
  }

  move(event) {
    if (event.keyCode == 37) {
      this.snakeBody.setDir({i: 0, j: -1})
    } else if (event.keyCode == 38) {
      this.snakeBody.setDir({i: -1, j: 0})
    } else if (event.keyCode == 39) {
      this.snakeBody.setDir({i: 0, j: 1})
    } else if (event.keyCode == 40) {
      this.snakeBody.setDir({i: 1, j: 0})
    }
  }

  step() {
    const testSnake = cloneDeep(this.snakeBody)
    testSnake.nextStep()
    if (testSnake.isTouchMyself()) {
      this.stop()
      return
    }
    if (testSnake.isTouchGameObject(this.food)) {
      this.setFood()
      this.addScore()
      this.snakeBody.pushCellInEnd()
    } else if (testSnake.isTouchGameObject(this.map)) {
      this.stop()
      return
    }

    this.snakeBody.nextStep()
    this.draw()
  }

  draw() {
    this.graphic.clear()
    this.graphic.drawBoardByGameObjects(this.board)
    this.graphic.drawGameObject(this.food)
  }

  play() {
    this.game = setInterval(this.step.bind(this), this.freq)
    document.addEventListener('keydown', this.move.bind(this))
  }
  stop() {
    document.removeEventListener('keydown', this.move.bind(this))
    clearInterval(this.game)
    this._goToMenu(this.score)
  }

  addScore() {
    this.score += this.level
    this._setScore(this.score)
  }

  initBoard() {
    const kStr = 24, kColumn = 16
    const board = new Board(kStr, kColumn)
    return board
  }

  initMap() {
    const map = new GameObject({i: 0, j: 0})
    for (let i = 0; i < 24; i++) {
      map.pushCell({i: i, j: 0}, blockImages[0])
      map.pushCell({i: i, j: 15}, blockImages[0])
    }
    for (let j = 0+1; j < 24-1; j++) {
      map.pushCell({i: 0, j: j}, blockImages[0])
      map.pushCell({i: 23, j: j}, blockImages[0])
    }
    return map
  }
}
