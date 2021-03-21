const { Player } = require('./../multiplayer/multiplayer')

module.exports = class GameRequests {
  static async joinlobby(data, playerManager) {
    const player = playerManager.addPlayer(new Player(data.player.name))
    const result = {
      player: player.forClient(),
      log: "player is registered"
    }
    return result
  }


  static async lobbyinf(data, playerManager, roomManager) {
    const player = playerManager.getPlayerById(data.player.id)
    player.updateDate()
    const result = {
      lobby: Object.assign(
        playerManager.forClient(),
        roomManager.forClient()
      ),
      log: "ok"
    }
    return result
  }


  static async joinroom(data, playerManager, roomManager) {
    const room = roomManager.getRoom()
    const player = playerManager.getPlayerById(data.player.id)
    player.updateDate()
    room.addPlayer(player)
    const result = {
      player: player.forClient(),
      log: "player is joined"
    }
    return result
  }


  static async getroominf(data, playerManager, roomManager) {
    const room = roomManager.getRoomById(data.player.roomid)
    const player = playerManager.getPlayerById(data.player.id)
    player.updateDate()
    const result = {
      player: player.forClient(),
      room: room.forClient(),
      log: "ok"
    }
    return result
  }


  static async ready(data, playerManager, roomManager) {
    const room = roomManager.getRoomById(data.player.roomid)
    const player = playerManager.getPlayerById(data.player.id)
    player.updateDate()
    const log = room.changeReady(player)
    let result = {
      player: player.forClient(),
      log: log
    }
    return result
  }


  static async makemove(data, playerManager, roomManager) {
    const room = roomManager.getRoomById(data.player.roomid)
    const player = playerManager.getPlayerById(data.player.id)
    player.updateDate()
    const log = room.move(data.move.i, data.move.j, player)
    const result = {
      player: player.forClient(),
      log: log
    }
    return result
  }
}
