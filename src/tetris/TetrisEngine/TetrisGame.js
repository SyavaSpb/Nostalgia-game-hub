import {Board} from 'cell-games-front/Board.js'
import GameObject from 'cell-games-front/GameObject.js'
import {Controller} from 'cell-games-front/Controller.js'
import {Graphic} from 'cell-games-front/Graphic.js'

import {Block} from './Block.js'
import TetrisBoard from './TetrisBoard.js'

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


export default class TetrisGame {
  constructor(jMax, iMax, canvas, level, _goToMemu, _setScore, _setLevel) {
    this.board = new TetrisBoard(10, 22)
    this.nextBlock = new Block({i: 1, j: 5},
        blockImages[Math.floor(Math.random() * blockImages.length)])
    this.block = new Block({i: 1, j: 5},
        blockImages[Math.floor(Math.random() * blockImages.length)])
    this.graphic = new Graphic(canvas, 10)
    this.game = null
    this.score = 0
    this.level = level
    this.startLevel = level
    this.lines = 0
    this._setScore = _setScore
    this._goToMemu = _goToMemu
    this._setLevel = _setLevel
  }

  draw() {
    if (this.graphicForNext) {
      this.graphicForNext.clear()
      this.nextBlock.body.forEach(cell => {
        this.graphicForNext.drawCellUsingGrid(cell, {i: cell.ind.i + 1, j: cell.ind.j + 2})
      })
    } else if (document.querySelector('#next')) {
      this.graphicForNext = new Graphic(document.querySelector('#next'), 4)
    }
    this.graphic.clear()
    this.graphic.drawBoardByGrid(this.board)
    this.graphic.drawGameObject(this.block)
  }

  move(event) {
    const tmp = event.keyCode - 38
    if (Math.abs(tmp) == 1) {
      const testBlock = cloneDeep(this.block)
      testBlock.ind.j += tmp
      if (this.board.isPossibleSetBlock(testBlock)) {
        this.block.ind.j += tmp
        this.draw()
      }
    } else if (Math.abs(tmp) == 0) {
      const testBlock = cloneDeep(this.block)
      testBlock.turnBlock()
      if (this.board.isPossibleSetBlock(testBlock)) {
        this.block.turnBlock()
        this.draw()
      }
    } else if (Math.abs(tmp) == 2) {
      this.down()
    }
  }

  down() {
    let log
    const testBlock = cloneDeep(this.block)
    testBlock.ind.i += 1
    if (this.board.isPossibleSetBlock(testBlock)) {
      this.block.ind.i += 1
    } else {
      log = this.board.pushBlock(this.block)
      this.block = cloneDeep(this.nextBlock)
      this.nextBlock = new Block(
        {i: 1, j: 5},
        blockImages[Math.floor(Math.random() * blockImages.length)]
      )
    }
    this.draw()
    if (log == "loose") {
      this.stop()
    } else if (log > 0) {
      this.lines += log
      this.score += log * log * this.level * this.level
      this._setScore(this.score)
      this.level = Math.min(this.startLevel + ~~(this.lines / 15), 16)
      this._setLevel(this.level)
      clearInterval(this.game)
      this.game = setInterval(this.down.bind(this), (17 - this.level) * 40)
    }
  }

  play() {
    this.game = setInterval(this.down.bind(this), (17 - this.level) * 40)
    document.addEventListener('keydown', this.move.bind(this))
  }
  stop() {
    document.removeEventListener('keydown', this.move.bind(this))
    clearInterval(this.game)
    this._goToMemu(this.score)
  }
}
