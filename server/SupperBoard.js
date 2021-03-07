const Board = require('cell-games-front/Board.js')
const GameObject = require('cell-games-front/GameObject.js')

class SupperCell extends GameObject {
  constructor() {
    super({i: 0, j: 0})
    this.pushCell({i: 0, j: 0})
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
    this.isStart = false
  }
  initBoard() {
    for (let i = 0; i < this.iMax; i++) {
      this.fillStr(i, new SupperCell())
    }
  }

  open(i, j) {
    if (!this.isStart) {
      this.startGame(i, j)
      this.isStart = true
      return "ok"
    }

    const grid = this.getGrid()
    grid[i][j].isOpen = true
    if (grid[i][j].isMine) {
      return 'mine'
    } else if (grid[i][j].amoungMineAround == 0) {
      const visited = new Array(this.iMax)
        .fill(null)
        .map(() => new Array(this.jMax).fill(false))
      const checkCellOnEmpty = (i, j, ii, jj) => {
        if (i + ii >= 0 && i + ii < this.iMax && j + jj >= 0 && j + jj < this.jMax) {
          return !grid[i + ii][j + jj].isMine && !visited[i + ii][j + jj]
        }
        return false
      }
      const queue = new Array()
      queue.push({j: j, i: i})
      visited[queue[0].i][queue[0].j] = true
      let ind = 0
      while (ind < queue.length) {
        grid[queue[ind].i][queue[ind].j].isOpen = true
        ind++
        if (grid[queue[ind - 1].i][queue[ind - 1].j].amoungMineAround != 0) continue
        if (checkCellOnEmpty(queue[ind - 1].i, queue[ind - 1].j, 1, 1)) {
          queue.push({i: queue[ind - 1].i + 1, j: queue[ind - 1].j + 1})
          visited[queue[ind - 1].i + 1][queue[ind - 1].j + 1] = true
        }
        if (checkCellOnEmpty(queue[ind - 1].i, queue[ind - 1].j, 1, 0)) {
          queue.push({i: queue[ind - 1].i + 1, j: queue[ind - 1].j + 0})
          visited[queue[ind - 1].i + 1][queue[ind - 1].j + 0] = true
        }
        if (checkCellOnEmpty(queue[ind - 1].i, queue[ind - 1].j, 1, -1)) {
          queue.push({i: queue[ind - 1].i + 1, j: queue[ind - 1].j + -1})
          visited[queue[ind - 1].i + 1][queue[ind - 1].j + -1] = true
        }
        if (checkCellOnEmpty(queue[ind - 1].i, queue[ind - 1].j, 0, 1)) {
          queue.push({i: queue[ind - 1].i + 0, j: queue[ind - 1].j + 1})
          visited[queue[ind - 1].i + 0][queue[ind - 1].j + 1] = true
        }
        if (checkCellOnEmpty(queue[ind - 1].i, queue[ind - 1].j, 0, -1)) {
          queue.push({i: queue[ind - 1].i + 0, j: queue[ind - 1].j + -1})
          visited[queue[ind - 1].i + 0][queue[ind - 1].j + -1] = true
        }
        if (checkCellOnEmpty(queue[ind - 1].i, queue[ind - 1].j, -1, 1)) {
          queue.push({i: queue[ind - 1].i + -1, j: queue[ind - 1].j + 1})
          visited[queue[ind - 1].i + -1][queue[ind - 1].j + 1] = true
        }
        if (checkCellOnEmpty(queue[ind - 1].i, queue[ind - 1].j, -1, 0)) {
          queue.push({i: queue[ind - 1].i + -1, j: queue[ind - 1].j + 0})
          visited[queue[ind - 1].i + -1][queue[ind - 1].j + 0] = true
        }
        if (checkCellOnEmpty(queue[ind - 1].i, queue[ind - 1].j, -1, -1)) {
          queue.push({i: queue[ind - 1].i + -1, j: queue[ind - 1].j + -1})
          visited[queue[ind - 1].i + -1][queue[ind - 1].j + -1] = true
        }
      }
    } else {
      grid[i][j].isOpen = true
    }

    return "ok"
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
    grid[i][j].isOpen = true
    const isExist = (i, j, ii, jj) => {
      if (i + ii >= 0 && i + ii < this.iMax && j + jj >= 0 && j + jj < this.jMax) {
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
  startGame(i, j) {
    this.isStart = true
    let randomPos
    if (i == -1 && j == -1) {
      i = ~~(Math.random() * this.iMax)
      j = ~~(Math.random() * this.jMax)
    }
    this.firstOpen(i, j)
    const grid = this.getGrid()
    const cellsForMines = this.randomWithFilter(cell => !cell.isOpen, this.amoungMine)
    cellsForMines.forEach(ind => {
      grid[ind.i][ind.j].isMine = true
    })
    grid.forEach((str, i) => {
      str.forEach((cell, j) => {
        if (!cell.isMine) {
          const checkCellOnMine = (i, j, ii, jj) => {
            if (i + ii >= 0 && i + ii < this.iMax && j + jj >= 0 && j + jj < this.jMax) {
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
    this.open(i, j)
  }

  forClient() {
    const gridForCLient = new Array(this.iMax)
      .fill(null)
      .map(() => new Array(this.jMax).fill(null))
    const grid = this.getGrid()
    grid.forEach((str, i) => {
      str.forEach((cell, j) => {
        gridForCLient[i][j] = grid[i][j].forClient()
      })
    })
    return gridForCLient
  }
}
