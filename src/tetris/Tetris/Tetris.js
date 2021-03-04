import {Board} from 'cell-games-front/Board.js'
import GameObject from 'cell-games-front/GameObject.js'
import {Controller} from 'cell-games-front/Controller.js'
import {Graphic} from 'cell-games-front/Graphic.js'

import {Block} from './Block.js'
import TetrisBoard from './TetrisBoard.js'

const cloneDeep = require('lodash.clonedeep')

import yellow_block_src from '../../assets/yellow_block.png'
const yellow_block = new Image()
yellow_block.src = './' + yellow_block_src.toString()

export default class TetrisGame {
  constructor(jMax, iMax, canvas) {
    this.board = new TetrisBoard(10, 22)
    this.nextBlock = new Block({i: 1, j: 5}, yellow_block)
    this.block = new Block({i: 1, j: 5}, yellow_block)
    this.graphic = new Graphic(canvas, 10)
    this.proc = null
  }
  draw() {
    this.graphic.clear()
    this.graphic.drawBoardByGrid(this.board)
    this.graphic.drawGameObject(this.block)
  }
  move(event) {
    const tmp = event.keyCode - 38
    if (Math.abs(tmp) <= 1) {
      const testBlock = cloneDeep(this.block)
      if (tmp == 0) {
        testBlock.turnBlock()
        if (this.board.isPossibleSetBlock(testBlock)) {
          this.block.turnBlock()
          this.draw()
        }
      } else {
        testBlock.ind.j += tmp
        if (this.board.isPossibleSetBlock(testBlock)) {
          this.block.ind.j += tmp
          this.draw()
        }
      }
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
      this.nextBlock = new Block({i: 1, j: 5}, yellow_block)
    }
    this.draw()
    if (log == "loose") {
      console.log("loose")
      this.stop()
    }
  }
  play() {
    this.proc = setInterval(this.down.bind(this), 200)
    document.addEventListener('keydown', this.move.bind(this))
  }
  stop() {
    document.removeEventListener('keydown', this.move.bind(this))
    clearInterval(this.proc)
  }
}
