import GameObject from 'cell-games-front/GameObject.js'
import Board from 'cell-games-front/Board.js'

const cloneDeep = require('lodash.clonedeep')

export default class TetrisBoard extends Board {
  constructor(jMax, iMax) {
    super(jMax, iMax)
    this.filled = new GameObject({i: 0, j: 0})
    this.addGameObject(this.filled)
  }

  pushBlock(block) {
    let minI = 999, maxI = -1
    block.body.forEach(cell => {
      const i = block.ind.i + cell.ind.i,
            j = block.ind.j + cell.ind.j
      minI = Math.min(i, minI)
      maxI = Math.max(i, maxI)
      this.filled.pushCell({i: i, j: j}, cell.image)
    })

    if (minI <= 1) {
      return "loose"
    }

    let lines = 0
    const grid = this.getGrid()
    for (let i = minI; i <= maxI; i++) {
      const str = grid[i]
      if (str.reduce((acc, cell) => cell && acc, true)) {
        lines++
        for (let ii = i; ii > 0; ii--) {
          grid[ii] = cloneDeep(grid[ii - 1])
        }
      }
    }

    if (lines > 0) {
      this.filled.body = new Array()
      grid.forEach((str, i) => {
        str.forEach((cell, j) => {
          if (cell) {
            this.filled.pushCell({i: i, j: j}, cell.image)
          }
        })
      })
    }
    return lines
  }

  isPossibleSetBlock(block) {
    return block.body.reduce((acc, cell) => {
      return this.isFree(block.ind, cell.ind) && acc
    }, true)
  }
}
