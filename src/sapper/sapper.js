import {Board} from 'cell-games-front/Board.js'
import {Controller} from 'cell-games-front/Controller.js'
import {GameObject} from 'cell-games-front/GameObject.js'
// import {Graphic} from 'cell-games-front/Graphic.js'
const {Graphic} = require('cell-games-front/Graphic.js')

const images = new Array()
import yellow_block from '../assets/yellow_block.png'
images.push(new Image())
images[0].src = './' + yellow_block.toString()
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
import mine from '../assets/mine.png'
images.push(new Image())
images[9].src = './' + mine.toString()


export class Sapper {
  constructor(canvas) {
    this.graphic = new Graphic(canvas)
  }
  setGrid(grid) {
    this.grid = grid
    grid.forEach((str, i) => {
      str.forEach((cell, j) => {
        if (!cell.isOpen) {
          // cell.image = new Image()
          // cell.image.src = './' + yellow_block.toString()
          cell.image = images[0]
        } else {
          if (cell.amoungMineAround > 0) {
            cell.image = images[cell.amoungMineAround]
          }
          if (cell.isMine) {
            cell.image = images[9]
          }
        }
      })
    })
  }
  draw() {
    this.graphic.drawGrid(this.grid)
  }
}
