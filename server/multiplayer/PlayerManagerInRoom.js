module.exports = class PlayerManagerInRoom {
  constructor(players, watchers, state, id) {
    this.players = players
    this.watchers = watchers
    this.state = state
    const chekingConnect = setInterval(this.checkConnect.bind(this), 1000)
  }

  addPlayer(player) {
    if (this.state == "game") {
      this.watchers.push(player)
    } else {
      this.players.push(player)
    }
  }

  checkConnect() {
    this.players.forEach(player => {
      if (Date.now() - player.date < 1000 * 10) {
        player.isConnect = true
      } else {
        player.isConnect = false
      }
    })
  }

  checkPlayersInLobby() {
    this.players = this.players.filter(player => {
      return Date.now() - player.date < 1000 * 15
    })
    if (this.players.length == 0) {
      this._removeRoom(this.id)
    }
  }

  mixPlayers() {

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

  nextPlayer(ind) {
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
}
