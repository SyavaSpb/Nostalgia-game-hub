const SupperGame = require('./../SupperServer.js')
const PlayerManagerInRoom = require('./PlayerManagerInRoom.js')

module.exports = class Room {
  constructor(_removeRoom) {
    this.players = new Array()
    this.watchers = new Array()
    this.state = "wait"
    this.property = {
      sapperProperty: {
        w: 8,
        h: 10,
        mines: 10
      }
    }
    this._removeRoom = _removeRoom
    this.playerManager = new PlayerManagerInRoom(players, watchers, state)
  }

  setid(roomid) {
    this.id = roomid
  }

  initGame() {
    this.game = new SupperGame(8, 10, 10)
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
      this.nextPlayer(this.players.indexOf(playerMove))
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

  endGame() {
    this.game = null
    this.players = this.players.filter(player => {
      return Date.now() - player.date < 1000 * 30
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
    this.chekingLobby = setInterval(this.checkPlayersInLobby.bind(this), 500)
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
