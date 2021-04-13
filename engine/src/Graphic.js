module.exports = class Graphic {
  constructor(canvas, cellsPerLine, fps = 60) {
    this.canvas = canvas
    this.ctx = canvas.getContext("2d")
    this.fps = fps
    this.boards = []
    this.gameObjects = []
    this.cellsPerLine = cellsPerLine
    this.updateProperty()
  }

  updateProperty() {
    this.ws = {
      w: this.canvas.clientWidth,
      h: this.canvas.clientHeight,
      sizeCell: this.canvas.clientWidth / this.cellsPerLine,
      del: this.cellsPerLine
    }
    this.canvas.width = this.ws.w
    this.canvas.height = this.ws.h
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  addBoard(board) {
    this.boards.push(board)
  }
  addGameObject(gameObject) {
    this.gameObjects.push(gameObject)
  }

  setfps(fps) {
    clearInterval(this.drawing)
    this.fps = fps
    this.draw()
  }

  draw() {
    this.drawing = setInterval(() => {
      this.updateProperty()
      this.clear()
      this.boards.forEach(board => this.drawBoard(board))
      this.gameObjects.forEach(gameObject => this.drawGameObject(gameObject))
    }, 1 / this.fps)
  }

  drawBoardByGameObjects(board) {
    board.gameObjects.forEach(gameObject => this.drawGameObject(gameObject))
  }

  drawGameObject(gameObject) {
    gameObject.body.forEach(cell => {
      if (cell) {
        this.drawCellUsingGameObject(cell, {i: gameObject.ind.i, j: gameObject.ind.j})
      }
    })
  }

  drawCellUsingGameObject(cell, delta) {
    if (!cell.image) return
    let x = this.ws.sizeCell * (cell.ind.j + delta.j)
    let y = this.ws.sizeCell * (cell.ind.i + delta.i)
    this.ctx.drawImage(cell.image, x, y, this.ws.sizeCell, this.ws.sizeCell)
  }

  drawBoardByGrid(board) {
    this.updateProperty()

    const grid = board.getGrid()
    this.drawGrid(grid)
  }

  drawGrid(grid) {
    this.updateProperty()
    grid.forEach((str, i) => {
      str.forEach((cell, j) => {
        if (cell) {
          this.drawCellUsingGrid(cell, {i: i, j: j})
        }
      })
    })
  }

  drawCellUsingGrid(cell, ind) {
    if (!cell.image) return
    let x = this.ws.sizeCell * ind.j
    let y = this.ws.sizeCell * ind.i
    this.ctx.drawImage(cell.image, x, y, this.ws.sizeCell, this.ws.sizeCell)
  }
}
