const SupperGame = require('./../SupperServer.js')
const PlayerManagerInRoom = require('./PlayerManagerInRoom.js')

module.exports = class Room {
  constructor(_removeRoom) {
    this.players = new Array()
    this.watchers = new Array()
    this.state = "wait"
    this.property = {
      sapperProperty: {
        w: 14,
        h: 18,
        mines: 40
      }
    }
    this._removeRoom = _removeRoom
    this.playerManager = new PlayerManagerInRoom(
      this.players, this.watchers, this.state
    )
  }

  setid(roomid) {
    this.id = roomid
  }

  addPlayer(player) {
    this.playerManager.addPlayer(player)
    player.setRoom(this.id)
  }

  changeReady(player) {
    const log = this.playerManager.changeReady(player)
    if (this.playerManager.checkReady()) {
      this.initGame()
      this.startGame()
    }
    return log
  }

  initGame() {
    this.game = new SupperGame(14, 18, 50)
    this.players.forEach(player => {
      player.isLoose = false
      player.isMove = false
    })
    // this.startGame()
  }

  startGame() {
    this.state = "game"
    this.players[0].isMove = true
    this.players[0].timeEndMove = Date.now() + 1000 * 30
    if (this.chekingLobby) {
      clearInterval(this.checkPlayersInLobby)
    }
    this.checkingGame = setInterval(this.checkGame.bind(this), 500)
    this.game.startGame()
  }

  checkGame() {
    const playerMove = this.players.filter(player => player.isMove)[0]
    if (playerMove.timeEndMove - Date.now() < 500) {
      playerMove.isLoose = true
      playerMove.isMove = false
      const log = this.playerManager.nextPlayer(this.players.indexOf(playerMove))
      if (log == "end") {
        this.endGame()
      }
    }
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
      const logNext = this.playerManager.nextPlayer(this.players.indexOf(player))
      if (logNext == "end") {
        this.endGame()
      }
    } else {
      log = 'it isn\'t your move'
    }
    return log
  }

  endGame() {
    clearInterval(this.checkingGame)
    this.game = null
    this.players = this.players.filter(player => {
      if (Date.now() - player.date < 1000 * 30) {
        return true
      } else {
        player.setRoom(-1)
        return false
      }
    })
    this.watchers.forEach(watchcer => {
      this.players.push(watchcer)
    })
    this.wathcers = new Array()
    this.players.forEach(player => {
      player.ready = false
    })
    this.state = "wait"
    if (this.checkTimeMoves) {
      clearInterval(this.checkTimeMoves)
    }
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
