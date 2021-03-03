function getBody(req) {
  let body = '';
  req.on('data', chunk => body += chunk.toString())
  return new Promise((resolve, reject) => {
    req.on('end', () => {
      body = JSON.parse(body)
      resolve(body)
    })
  })
}

function joinLobby(req, playerManager) {
  getBody(req)
    .then(data => {
      const player = new Player(data.player.name)
      playerManager.addPlayer(player)
      const result = {
        player: player.forClient(),
        log: "player is registered"
      }
      // res.end(JSON.stringify(result))
      return result
    })
}
