const SupperGame = require('./../SupperServer.js')

module.exports = class Room {
  constructor() {
    this.players = new Array()
    this.state = "wait"
    // setInterval(this.log.bind(this), 2000)
  }

  addPlayer(player) {
    player.setRoom(this.id)
    this.players.push(player)
  }

  checkReady() {
    return this.players.reduce((acc, curr) => curr.ready && acc, true)
  }

  endGame() {
    this.players.forEach(player => {
      player.ready = false
    })
    this.state = "wait"
  }

  nextPlayer(ind) {
    let i = ind + 1
    if (i == this.players.length) i = 0
    while (this.players[i].isLoose) {
      i++
      if (i == this.players.length) i = 0
      if (i == ind + 1) {
        this.endGame()
        return
      }
    }
    this.players[i].isMove = true
  }

  move(i, j, player) {
    let log = ''
    if (player.isMove) {
      player.isMove = false
      const res = this.game.move(i, j)
      if (res == 'mine') {
        player.isLoose = true
        log = 'loose'
      }
      if (this.game.isEnd()) this.endGame()
      else this.nextPlayer(this.players.indexOf(player))
    } else {
      log = 'it isn\'t your move'
    }
    return log
  }

  forClient() {
    const playersForCLient = new Array()
    this.players.forEach(player => {
      playersForCLient.push(player.forClient())
    })
    const result = {
      players: playersForCLient
    }
    if (this.state) {
      result.state = this.state
    }
    if (this.game) {
      result.game = this.game.forClient()
    }
    return result
  }

  initGame() {
    // this.state = "init"
    // this.timeToStart = Date.now()
    // setTimeout(this.startGame, 4800)
    this.game = new SupperGame(8, 10, 10)
    this.players.forEach(player => {
      player.isLoose = false
      player.isMove = false
    })
    this.startGame()
  }

  startGame() {
    this.state = "game"
    this.players[0].isMove = true
    this.game.startGame()
  }

  setid(roomid) {
    this.id = roomid
  }

  updateDate() {
    this.date = Date.now()
  }

  log() {
    console.log(this.players);
  }
}
