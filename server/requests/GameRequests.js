const config = require('./../../config.json')

async function getBody(req) {
  let body = '';
  req.on('data', chunk => body += chunk.toString())
  data = await new Promise(r => req.on('end', () => r(JSON.parse(body))))
  return data
}

module.exports = class GaneRequest {
  constructor() {

  }
  async joinlobby(req, playerManager, Player) {
    const data = await getBody(req)
    const player = new Player(data.player.name)
    playerManager.addPlayer(player)
    const result = {
      player: player.forClient(),
      log: "player is registered"
    }
    return result
  })
}
