class Cell {
  constructor(ind, image = null) {
    this.ind = ind
    this.image = image
  }

  setImage(image) {
    if (!image) {
      this.image = new Image()
    }
    this.image = image
  }
}

module.exports = class GameObject {
  constructor (ind) {
    this.body = []
    this.ind = ind
  }

  pushCell(ind, image) {
    this.body.push(new Cell(ind, image))
  }

  deleteCell(cell) {

  }

  isEmpty() {
    return this.body.length === 0
  }

  newCell(ind, image) {
    return new Cell(ind, image)
  }
}
