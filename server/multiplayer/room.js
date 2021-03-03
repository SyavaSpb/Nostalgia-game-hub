const SupperGame = require('./../SupperServer.js')

module.exports = class Room {
  constructor() {
    this.players = new Array()
    this.state = "wait"
    this.property = {
      sapperProperty: {
        w: 8,
        h: 10,
        mines: 10
      }
    }
  }

  setRoomProperty(property) {
    this.property = Object.assign(this.property, property)
  }

  setid(roomid) {
    this.id = roomid
  }

  updateDate() {
    this.date = Date.now()
  }

  addPlayer(player) {
    player.setRoom(this.id)
    this.players.push(player)
  }

  changeReady(player) {
    if (this.state == "wait") {
      player.changeReady()
      if (this.checkReady()) {
        this.initGame()
      }
      return "ready is changed"
    } else {
      return "fail"
    }
  }

  checkReady() {
    return this.players.reduce((acc, curr) => curr.ready && acc, true)
  }

  mixPlayers() {

  }

  initGame() {
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

  move(i, j, player) {
    let log = ''
    if (player.isMove) {
      // is possible move
      player.isMove = false
      const res = this.game.move(i, j)
      console.log(res)
      if (res == 'mine') {
        player.isLoose = true
        log = 'loose'
      }
      // } else if (res == 'end') {
      //   this.endGame()
      // } else {
        this.nextPlayer(this.players.indexOf(player))
      // }
    } else {
      log = 'it isn\'t your move'
    }
    return log
  }

  nextPlayer(ind) {
    for (let i = ind + 1; i < this.players.length; i++) {
      if (!this.players[i].isLoose) {
        this.players[i].isMove = true
        return
      }
    }
    for (let i = 0; i <= ind; i++) {
      if (!this.players[i].isLoose) {
        this.players[i].isMove = true
        return
      }
    }
    this.endGame()
    return
  }

  endGame() {
    this.game = null
    this.players.forEach(player => {
      player.ready = false
    })
    this.state = "wait"
    console.log("end")
  }

  forClient() {
    const playersForCLient = this.players.map(player => {
      return player.forClient()
    })
    const result = {
      players: playersForCLient,
      state: this.state
    }
    if (this.game) {
      result.game = this.game.forClient()
    }
    return result
  }
}
