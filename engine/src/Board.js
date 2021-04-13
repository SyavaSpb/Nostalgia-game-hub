// const GameObject = require("./GameObject.js")
const lodashClonedeep = require("lodash.clonedeep")

module.exports = class Board {
  constructor(jMax, iMax) {
    this.iMax = iMax
    this.jMax = jMax

    this.gameObjects = []
  }

  fillStr(i, gameObject, j1 = 0, j2 = this.jMax) {
    for (let j = j1; j < j2; j++) {
      this.addGameObject(lodashClonedeep(gameObject), i, j)
    }
  }

  fillColumn(j, gameObject, i1 = 0, i2 = this.iMax) {
    for (let i = i1; i < i2; i++) {
      this.addGameObject(lodashClonedeep(gameObject), i, j)
    }
  }

  addGameObject(gameObject, i, j) {
    if (i >= 0 && j >= 0) {
      gameObject.ind = {i: i, j: j}
    }
    this.gameObjects.push(gameObject)
  }

  getGrid() {
    let grid = new Array(this.iMax)
      .fill(null)
      .map(() => new Array(this.jMax).fill(null))

    this.gameObjects.forEach(gameObject => {
      gameObject.body.forEach(cell => {
        grid[gameObject.ind.i + cell.ind.i][gameObject.ind.j + cell.ind.j] = cell
      })
    })

    return grid
  }

  randomFreeCell() {
    let grid = this.getGrid()

    let freeGrid = []
    grid.forEach((str, i) => {
      str.forEach((cell, j) => {
        if (!cell) {
          freeGrid.push({i: i, j: j})
        }
      })
    })

    const result = freeGrid[~~(Math.random() * freeGrid.length)]

    return result
  }

  randomWithFilter(comparator, count = 1) {
    const grid = this.getGrid()

    const freeGrid = []
    grid.forEach((str, i) => {
      str.forEach((cell, j) => {
        if (comparator(cell)) {
          freeGrid.push({i: i, j: j})
        }
      })
    })

    const result = []
    for (let i = 0; i < count; i++) {
      const ind = ~~(Math.random() * freeGrid.length)
      result.push(freeGrid[ind])
      freeGrid.splice(ind, 1)
    }
    return result
  }

  isFree(ind, delta = {i: 0, j: 0}) {
    const grid = this.getGrid()
    const i = ind.i + delta.i
    const j = ind.j + delta.j
    if (i >= 0 && i < this.iMax && j >= 0 && j < this.jMax) {
      return !grid[ind.i + delta.i][ind.j + delta.j]
    } else {
      return false
    }
  }
}
