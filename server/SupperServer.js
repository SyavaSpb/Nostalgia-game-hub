// import {Board} from 'cell-games-front/Board.js'
// import {Controller} from 'cell-games-front/Controller.js'
// import {GameObject} from 'cell-games-front/GameObject.js'
// import {Graphic} from 'cell-games-front/Graphic.js'

const SupperBoard = require('./SupperBoard.js')

class SupperGame {
  constructor(w, h, amoungMine) {
    this.board = new SupperBoard(w, h, amoungMine)
  }

  isEnd() {
    if (this.board.amoungMine == this.board.amoungClosedCells()) {
      return true
    }
    return false
  }

  move(i, j) {
    return this.board.open(i, j)
  }

  forClient() {
    return {
      grid: this.board.forClient()
    }
  }

  startGame(i = -1, j = -1) {
    this.board.startGame(i, j)
  }

  log() {
    const grid = this.board.getGrid()
    grid.forEach((str, i) => {
      let string = ""
      str.forEach((cell, j) => {
        if (cell.isMine) string += "M"
        else string += cell.amoungMineAround.toString()
      })
      console.log(string)
    })
  }
}

module.exports = SupperGame
