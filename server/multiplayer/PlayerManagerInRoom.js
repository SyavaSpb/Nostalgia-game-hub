module.exports = class PlayerManagerInRoom {
  constructor(state) {
    this.players = new Array()
    this.watchers = new Array()
    this.state = state
    this.startCheckingConnect()
  }

  startCheckingConnect() {
    this.chekingConnect = setInterval(this.checkConnect.bind(this), 1000)
  }
  stopCheckingConnect() {
    clearInterval(this.chekingConnect)
  }
  checkConnect() {
    this.players.forEach(player => {
      if (Date.now() - player.date < 1000 * 10) {
        player.isConnect = true
      } else {
        player.isConnect = false
      }
    })
    if (this.state == "wait") {
      this.checkPlayersInLobby()
    }
  }
  checkPlayersInLobby() {
    this.players = this.players.filter(player => {
      if (Date.now() - player.date < 1000 * 15) {
        return true
      } else {
        player.setRoom(-1)
        return false
      }
    })
  }

  addPlayer(player) {
    if (this.state == "game") {
      this.watchers.push(player)
    } else {
      this.players.push(player)
    }
  }

  initPlayers() {
    this.players.forEach(player => {
      player.isLoose = false
      player.isMove = false
    })
  }

  getPlayerMove() {
    return this.players.filter(player => player.isMove)[0]
  }

  mixPlayers() {

  }

  deletePlayers() {
    this.players = this.players.filter(player => {
      if (Date.now() - player.date < 1000 * 30) {
        return true
      } else {
        player.setRoom(-1)
        return false
      }
    })
  }

  watchersToPlayers() {
    this.watchers.forEach(watchcer => {
      this.players.push(watchcer)
    })
    this.wathcers = new Array()
  }

  changeReady(player) {
    if (this.state == "wait") {
      player.changeReady()
      return "ready is changed"
    } else {
      return "fail"
    }
  }
  checkReady() {
    return this.players.reduce((acc, curr) => curr.ready && acc, true)
  }
  resetReady() {
    this.players.forEach(player => {
      player.ready = false
    })
  }

  nextPlayer() {
    const playerMove = this.getPlayerMove()
    if (!playerMove) {
      this.players[0].isMove = true
      this.players[0].timeEndMove = Date.now() + 1000 * 30
      return this.players[0]
    }
    const ind = this.players.indexOf(this.getPlayerMove())
    playerMove.isMove = false
    for (let i = ind + 1; i < this.players.length; i++) {
      if (!this.players[i].isLoose) {
        this.players[i].isMove = true
        this.players[i].timeEndMove = Date.now() + 1000 * 30
        return this.players[i]
      }
    }
    for (let i = 0; i <= ind; i++) {
      if (!this.players[i].isLoose) {
        this.players[i].isMove = true
        this.players[i].timeEndMove = Date.now() + 1000 * 30
        return this.players[i]
      }
    }
    return "end"
  }

  forClient() {
    const playersForCLient = this.players.map(player => {
      return player.forClient()
    })
    const watchersForCLient = this.watchers.map(player => {
      return player.forClient()
    })
    const result = {
      players: playersForCLient,
      watchers: watchersForCLient
    }
    return result
  }
}
