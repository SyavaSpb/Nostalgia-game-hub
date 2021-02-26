// import {Board} from 'cell-games-front/Board.js'
// import {GameObject} from 'cell-games-front/GameObject.js'

const Board = require('cell-games-front/Board.js')
const GameObject = require('cell-games-front/GameObject.js')

class SupperCell extends GameObject {
  constructor() {
    super({x: 0, y: 0})
    this.pushCell({x: 0, y: 0})
    this.cell = this.body[0]
    this.cell.isMine = false
    this.cell.isOpen = false
    this.cell.amoungMineAround = 0
    this.cell.forClient = function() {
      const result = {
        isOpen: this.isOpen
      }
      if (this.isOpen) {
        result.isMine = false
        if (this.isMine) {
          result.isMine = true
        } else {
          result.amoungMineAround = this.amoungMineAround
        }
      }
      return result
    }
  }
  forClient() {
    return this.cell.forClient()
  }
}

module.exports = class SupperBoard extends Board {
  constructor(w, h, amoungMine) {
    super(w, h)
    this.amoungMine = amoungMine
    this.initBoard()
    // this.initBoard()
  }
  initBoard() {
    for (let i = 0; i < this.kStr; i++) {
      this.fillStr(i, new SupperCell())
    }
  }

  open(i, j) {
    const grid = this.getGrid()
    grid[i][j].isOpen = true
    if (grid[i][j].isMine) {
      return 'mine'
    } else if (grid[i][j].amoungMineAround == 0) {
      const visited = new Array(this.kStr)
        .fill(null)
        .map(() => new Array(this.kColumn).fill(false))
      const checkCellOnEmpty = (i, j, ii, jj) => {
        if (i + ii >= 0 && i + ii < this.kStr && j + jj >= 0 && j + jj < this.kColumn) {
          return !grid[i + ii][j + jj].isMine && !visited[i + ii][j + jj]
        }
        return false
      }
      const queue = new Array()
      queue.push({x: i, y: j})
      visited[queue[0].x][queue[0].y] = true
      console.log(queue[0])
      let ind = 0
      while (ind < queue.length) {
        grid[queue[ind].x][queue[ind].y].isOpen = true
        ind++
        if (grid[queue[ind - 1].x][queue[ind - 1].y].amoungMineAround != 0) continue
        if (checkCellOnEmpty(queue[ind - 1].x, queue[ind - 1].y, 1, 1)) {
          queue.push({x: queue[ind - 1].x + 1, y: queue[ind - 1].y + 1})
          visited[queue[ind - 1].x + 1][queue[ind - 1].y + 1] = true
        }
        if (checkCellOnEmpty(queue[ind - 1].x, queue[ind - 1].y, 1, 0)) {
          queue.push({x: queue[ind - 1].x + 1, y: queue[ind - 1].y + 0})
          visited[queue[ind - 1].x + 1][queue[ind - 1].y + 0] = true
        }
        if (checkCellOnEmpty(queue[ind - 1].x, queue[ind - 1].y, 1, -1)) {
          queue.push({x: queue[ind - 1].x + 1, y: queue[ind - 1].y + -1})
          visited[queue[ind - 1].x + 1][queue[ind - 1].y + -1] = true
        }
        if (checkCellOnEmpty(queue[ind - 1].x, queue[ind - 1].y, 0, 1)) {
          queue.push({x: queue[ind - 1].x + 0, y: queue[ind - 1].y + 1})
          visited[queue[ind - 1].x + 0][queue[ind - 1].y + 1] = true
        }
        if (checkCellOnEmpty(queue[ind - 1].x, queue[ind - 1].y, 0, -1)) {
          queue.push({x: queue[ind - 1].x + 0, y: queue[ind - 1].y + -1})
          visited[queue[ind - 1].x + 0][queue[ind - 1].y + -1] = true
        }
        if (checkCellOnEmpty(queue[ind - 1].x, queue[ind - 1].y, -1, 1)) {
          queue.push({x: queue[ind - 1].x + -1, y: queue[ind - 1].y + 1})
          visited[queue[ind - 1].x + -1][queue[ind - 1].y + 1] = true
        }
        if (checkCellOnEmpty(queue[ind - 1].x, queue[ind - 1].y, -1, 0)) {
          queue.push({x: queue[ind - 1].x + -1, y: queue[ind - 1].y + 0})
          visited[queue[ind - 1].x + -1][queue[ind - 1].y + 0] = true
        }
        if (checkCellOnEmpty(queue[ind - 1].x, queue[ind - 1].y, -1, -1)) {
          queue.push({x: queue[ind - 1].x + -1, y: queue[ind - 1].y + -1})
          visited[queue[ind - 1].x + -1][queue[ind - 1].y + -1] = true
        }
      }
      return 'ok'
    } else {
      grid[i][j].isOpen = true
      return 'ok'
    }
  }

  amoungClosedCells() {
    const grid = this.getGrid()
    let amoung = 0
    grid.forEach((str, i) => {
      str.forEach((cell, j) => {
        if (!cell.isOpen || cell.isMine) amoung++
      })
    })
    return amoung
  }

  firstOpen(i, j) {
    const grid = this.getGrid()
    // console.log(grid)
    grid[i][j].isOpen = true
    const isExist = (i, j, ii, jj) => {
      if (i + ii >= 0 && i + ii < this.kStr && j + jj >= 0 && j + jj < this.kColumn) {
        return true
      }
      return false
    }
    if (isExist(i, j, 1, 1)) grid[i + 1][j + 1].isOpen = true
    if (isExist(i, j, 1, 0)) grid[i + 1][j + 0].isOpen = true
    if (isExist(i, j, 1, -1)) grid[i + 1][j + -1].isOpen = true
    if (isExist(i, j, 0, 1)) grid[i + 0][j + 1].isOpen = true
    if (isExist(i, j, 0, -1)) grid[i + 0][j + -1].isOpen = true
    if (isExist(i, j, -1, 1)) grid[i + -1][j + 1].isOpen = true
    if (isExist(i, j, -1, 0)) grid[i + -1][j + 0].isOpen = true
    if (isExist(i, j, -1, -1)) grid[i + -1][j + -1].isOpen = true
  }
  startGame() {
    const randomPos = {x: ~~(Math.random() * this.kStr), y: ~~(Math.random() * this.kColumn)}
    this.firstOpen(randomPos.x, randomPos.y)
    const grid = this.getGrid()
    const cellsForMines = this.randomWithFilter(cell => !cell.isOpen, this.amoungMine)
    cellsForMines.forEach(pos => {
      grid[pos.x][pos.y].isMine = true
    })
    grid.forEach((str, i) => {
      str.forEach((cell, j) => {
        if (!cell.isMine) {
          const checkCellOnMine = (i, j, ii, jj) => {
            if (i + ii >= 0 && i + ii < this.kStr && j + jj >= 0 && j + jj < this.kColumn) {
              return grid[i + ii][j + jj].isMine == true
            }
            return false
          }
          let amoungMineAround = 0
          if (checkCellOnMine(i, j, 1, 1)) amoungMineAround++
          if (checkCellOnMine(i, j, 0, 1)) amoungMineAround++
          if (checkCellOnMine(i, j, -1, 1)) amoungMineAround++
          if (checkCellOnMine(i, j, 1, 0)) amoungMineAround++
          if (checkCellOnMine(i, j, -1, 0)) amoungMineAround++
          if (checkCellOnMine(i, j, 1, -1)) amoungMineAround++
          if (checkCellOnMine(i, j, 0, -1)) amoungMineAround++
          if (checkCellOnMine(i, j, -1, -1)) amoungMineAround++
          cell.amoungMineAround = amoungMineAround
        }
      })
    })
    this.open(randomPos.x, randomPos.y)
  }
  forClient() {
    const gridForCLient = new Array(this.kStr)
      .fill(null)
      .map(() => new Array(this.kColumn).fill(null))
    const grid = this.getGrid()
    grid.forEach((str, i) => {
      str.forEach((cell, j) => {
        gridForCLient[i][j] = grid[i][j].forClient()
      })
    })
    return gridForCLient
  }
}
