const SupperGame = require('./../SupperServer.js')
const PlayerManagerInRoom = require('./PlayerManagerInRoom.js')

module.exports = class Room {
  constructor(roomid) {
    this.state = "wait"
    this.property = {
      sapperProperty: {
        w: 14,
        h: 18,
        mines: 40
      }
    }
    this.id = roomid
    this.playerManager = new PlayerManagerInRoom(this.state)
  }

  setState(str) {
    this.state = str
    this.playerManager.state = str
  }

  setid(roomid) {
    this.id = roomid
  }

  empty() {
    return this.playerManager.players.length == 0
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
    this.playerManager.initPlayers()
  }
  startGame() {
    this.setState("game")
    this.playerManager.nextPlayer()
    this.startCheckingGame()
    this.game.startGame()
  }

  startCheckingGame() {
    this.checkingGame = setInterval(this.checkGame.bind(this), 500)
  }
  stopCheckingGame() {
    clearInterval(this.checkingGame)
  }
  checkGame() {
    const playerMove = this.playerManager.getPlayerMove()
    if (playerMove.timeEndMove - Date.now() < 500) {
      playerMove.isLoose = true
      const log = this.playerManager.nextPlayer()
      if (log == "end") {
        this.endGame()
      }
    }
  }

  move(i, j, player) {
    let log = ''
    if (player.isMove) {
      // is possible move
      // player.isMove = false
      const res = this.game.move(i, j)
      if (res == 'mine') {
        player.isLoose = true
        log = 'loose'
      }
      const logNext = this.playerManager.nextPlayer()
      if (logNext == "end") {
        this.endGame()
      }
    } else {
      log = 'it isn\'t your move'
    }
    return log
  }

  endGame() {
    this.stopCheckingGame()
    this.game = null
    this.playerManager.deletePlayers()
    this.playerManager.watchersToPlayers()
    this.playerManager.resetReady()
    this.setState("wait")
  }

  forClient() {
    const playersForCLient = this.playerManager.forClient()
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
