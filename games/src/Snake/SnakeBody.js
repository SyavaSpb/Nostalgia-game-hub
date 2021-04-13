const GameObject = require('./../Engine/GameObject.js')

const cloneDeep = require('lodash.clonedeep')

module.exports = class SnakeBody extends GameObject {
  constructor(ind, imageHead, imageBody) {
    super(ind)
    this.imageBody = imageBody
    this.imageHead = imageHead
    this.pushCell({i: 0, j: 0}, imageHead)
    this.pushCell({i: -1, j: 0}, imageBody)
    this.pushCell({i: -2, j: 0}, imageBody)
    this.dir = {i: 1, j: 0}
  }

  setDir(dir) {
    if (!this.dir || this.dir.j !== -dir.j || this.dir.i !== -dir.i) {
      this.dir = cloneDeep(dir)
    }
  }

  nextStep() {
    for (let i = this.body.length - 1; i > 0; i--) {
      this.body[i].ind.j = this.body[i - 1].ind.j - this.dir.j
      this.body[i].ind.i = this.body[i - 1].ind.i - this.dir.i
    }
    this.ind.i += this.dir.i
    this.ind.j += this.dir.j
  }

  pushCellInEnd() {
    this.pushCell(cloneDeep(this.body[this.body.length - 1]), this.imageBody)
  }

  isTouchGameObject(gameObject, delta = {j: 0, i: 0}) {
    return gameObject.body.reduce((acc, cell) => {
      const stateX = (this.ind.j + delta.j === gameObject.ind.j + cell.ind.j)
      const stateY = (this.ind.i + delta.i === gameObject.ind.i + cell.ind.i)
      return (stateX && stateY) || acc
    }, false)
  }

  isTouchMyself() {
    return this.body
      .filter((cell, ind) => {
        return ind > 0
      })
      .reduce((acc, cell) => {
        return (cell.ind.i === 0 && cell.ind.j === 0) || acc
      }, false)
  }
}
