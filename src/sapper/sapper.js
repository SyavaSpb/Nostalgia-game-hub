import {Board} from 'cell-games-front/Board.js'
import {Controller} from 'cell-games-front/Controller.js'
import {GameObject} from 'cell-games-front/GameObject.js'
// import {Graphic} from 'cell-games-front/Graphic.js'
const {Graphic} = require('cell-games-front/Graphic.js')

const images = new Array()
import mine from '../assets/mine.png'
images.push(new Image())
images[0].src = './' + mine.toString()
import mines_around_1 from '../assets/mines_around_1.png'
images.push(new Image())
images[1].src = './' + mines_around_1.toString()
import mines_around_2 from '../assets/mines_around_2.png'
images.push(new Image())
images[2].src = './' + mines_around_2.toString()
import mines_around_3 from '../assets/mines_around_3.png'
images.push(new Image())
images[3].src = './' + mines_around_3.toString()
import mines_around_4 from '../assets/mines_around_4.png'
images.push(new Image())
images[4].src = './' + mines_around_4.toString()
import mines_around_5 from '../assets/mines_around_5.png'
images.push(new Image())
images[5].src = './' + mines_around_5.toString()
import mines_around_6 from '../assets/mines_around_6.png'
images.push(new Image())
images[6].src = './' + mines_around_6.toString()
import mines_around_7 from '../assets/mines_around_7.png'
images.push(new Image())
images[7].src = './' + mines_around_7.toString()
import mines_around_8 from '../assets/mines_around_8.png'
images.push(new Image())
images[8].src = './' + mines_around_8.toString()
import yellow_block from '../assets/yellow_block.png'
images.push(new Image())
images[9].src = './' + yellow_block.toString()
import brawn_block from '../assets/brawn_block.png'
images.push(new Image())
images[10].src = './' + brawn_block.toString()


export class Sapper {
  constructor(canvas, cellsPerLine, _serverMove) {
    this.graphic = new Graphic(canvas, cellsPerLine)
    this.flags = null
    this._serverMove = _serverMove
    this.cellsPerLine = cellsPerLine

    canvas.addEventListener("mousedown", this.move.bind(this))
    canvas.addEventListener("contextmenu", (event) => event.preventDefault())
  }

  move(event) {
    // event.preventDefault()
    const x = event.pageX - event.target.getBoundingClientRect().left
    const y = event.pageY - event.target.getBoundingClientRect().top
    const cellSize = event.target.clientWidth / this.cellsPerLine
    const i = Math.floor(y / cellSize)
    const j = Math.floor(x / cellSize)

    let rightBrn
    if (event.wich) {
      rightBrn = event.which == 3
    } else if (event.button) {
      rightBrn = event.button == 2
    }

    if (rightBrn) {
      this.toggleFlag(i, j)
      this.draw()
    } else {
      this._serverMove({i: i, j: j})
    }
  }

  toggleFlag(i, j) {
    this.flags[i][j] = !this.flags[i][j]
    if (this.flags[i][j]) {
      this.grid[i][j].image = images[10]
    } else {
      this.grid[i][j].image = images[9]
    }
  }

  setGrid(grid) {
    if (!this.flags) {
      this.flags = new Array(grid.length)
        .fill(null)
        .map(() => new Array(grid[0].length).fill(false))
    }
    this.grid = grid
    grid.forEach((str, i) => {
      str.forEach((cell, j) => {
        if (!cell.isOpen) {
          if (!this.flags[i][j]) {
            cell.image = images[9]
          } else {
            cell.image = images[10]
          }
        } else {
          if (cell.amoungMineAround > 0) {
            cell.image = images[cell.amoungMineAround]
          }
          if (cell.isMine) {
            cell.image = images[0]
          }
        }
      })
    })
  }

  draw() {
    this.graphic.drawGrid(this.grid)
  }
}
