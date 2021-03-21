module.exports = class PlayerManager {
  constructor() {
    this.players = new Map()
    this.delayDelete = 1000 * 30
    this.delayClean = 1000 * 60
    this.startCleaningPlayers()
  }

  newPlayer(player) {
    for (let id = 1000; id < 9999; id++) {
      if (!this.players.has(id)) {
        player.id = id
        this.players.set(id, player)
        return player
      }
    }
  }

  addPlayer(player) {
    let resultPlayer = null
    this.players.forEach(playerItem => {
      if (playerItem.name == player.name) {
        resultPlayer = playerItem
      }
    })
    if (!resultPlayer) {
      resultPlayer = this.newPlayer(player)
    }
    return resultPlayer
  }

  getPlayerById(id) {
    return this.players.get(id)
  }

  startCleaningPlayers() {
    this.cleaningPlayers = setInterval(this.cleanPlayers.bind(this), this.delayClean)
  }
  stopCleaningPlayers() {
    clearInterval(this.cleaningPlayers)
  }
  cleanPlayers() {
    for (let id = 1000; id < 9999; id++) {
      if (this.players.has(id)) {
        const comp1 = this.players.get(id).roomid == -1
        const comp2 = Date.now() - this.players.get(id).date > this.delayDelete
        if (comp1 && comp2) {
          this.players.delete(id)
        }
      }
    }
  }

  log() {
    console.log("Players: ", this.players.size)
  }

  forClient() {
    const result = {
      amoungPlayers: this.players.size
    }
    return result
  }
}
