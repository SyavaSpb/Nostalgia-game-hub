module.exports = class PlayerManager {
  constructor() {
    this.players = new Map()
    this.delayDelete = 1000 * 60
    this.delayClean = 1000 * 60 * 5

    // setInterval(() => this.log, 3000)
  }

  addPlayer(player) {
    for (let id = 1000; id < 9999; id++) {
      if (!this.players.has(id)) {
        player.id = id
        this.players.set(id, player)
        return
      }
    }
  }

  getPlayerById(id) {
    return this.players.get(id)
  }

  cleanPlayers() {
    for (let id = 1000; id < 9999; id++) {
      if (this.players.has(id)) {
        if (Date.now() - this.players[id].date < this.delayDelete) {
          this.players.delete(id)
        }
      }
    }
  }

  start() {
    setInterval(this.cleanPlayers, this.delayClean)
  }

  log() {
    console.log("Players: ", this.players.size)
  }
}
