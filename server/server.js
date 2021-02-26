const http = require('http')
const fs = require('fs')
const path = require('path')
const { Player, PlayerManager, Room, RoomManager } = require('./multiplayer/multiplayer')

// const SupperGame = require('./SupperServer.js')
// const cupperGame = new SupperGame(8, 10, 10)
// cupperGame.startGame()
// cupperGame.log()
// console.log()
// const gridForClient = cupperGame.forClinet().grid
// gridForClient.forEach((str, i) => {
//   let string = ""
//   str.forEach((cell, j) => {
//     if (!cell.isOpen) string += "C"
//     else if (cell.isMine) string += "M"
//     else string += cell.amoungMineAround.toString()
//   })
//   console.log(string)
// })


const roomManager = new RoomManager()
const playerManager = new PlayerManager()


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


const server = http.createServer((req, res) => {
  const requestUrl = req.url.split('/')
  requestUrl.splice(0, 1)

  if (requestUrl[0] == 'gamerequest') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    if (requestUrl[1] == 'getid') {
      getBody(req)
        .then(data => {
          const player = new Player(data.player.name)
          playerManager.addPlayer(player)
          const result = {
            player: player.forClient(),
            log: "player is registered"
          }
          res.end(JSON.stringify(result))
        })
    } else if (requestUrl[1] == 'joinroom') {
      getBody(req)
        .then(data => {
          const room = roomManager.getRoom()
          const player = playerManager.getPlayerById(data.player.id)
          room.addPlayer(player)
          const result = {
            player: player.forClient(),
            log: "player is joined"
          }
          res.end(JSON.stringify(result))
        })
    } else if (requestUrl[1] == 'getroominf') {
      getBody(req)
        .then(data => {
          const room = roomManager.getRoomById(data.player.roomid)
          const result = { room: room.forClient() }
          res.end(JSON.stringify(result))
        })
    } else if (requestUrl[1] == 'ready') {
      getBody(req)
        .then(data => {
          const room = roomManager.getRoomById(data.player.roomid)
          const player = playerManager.getPlayerById(data.player.id)
          let result = {}
          if (room.state == "wait") {
            player.changeReady()
            result = {
              player: player.forClient(),
              log: "ready is changes"
            }
            if (room.checkReady()) {
              room.initGame()
            }
          } else {
            result = {
              player: player.forClient(),
              log: "failed change ready"
            }
          }
          res.end(JSON.stringify(result))
        })
    } else if (requestUrl[1] == 'getgameinf') {
      getBody(req)
        .then(data => {
          const room = roomManager.getRoomById(data.player.roomid)
          const result = {
            room: room.forClient()
          }
          res.end(JSON.stringify(result))
        })
    } else if (requestUrl[1] == 'makemove') {
      getBody(req)
        .then(data => {
          const room = roomManager.getRoomById(data.player.roomid)
          const player = playerManager.getPlayerById(data.player.id)
          const log = room.move(data.move.y, data.move.x, player)
          if (log == 'loose'){

          }
          const result = {
            log: log
          }
          res.end(JSON.stringify(result))
        })
    }
  } else {
    let filePath = path.join(__dirname, '../dist')
    const ext = path.extname(req.url)
    let contentType = 'text/plain'
    if (ext == '.js') {
      contentType = 'text/javasript'
    } else if (ext == '.css') {
      contentType = 'text/css'
    }

    if (req.url == '/') {
      contentType = 'text/html'
      filePath = path.join(filePath, 'index.html')
    } else if (req.url == '/snake') {
      contentType = 'text/html'
      filePath = path.join(filePath, 'game.html')
    } else if (req.url == '/sapper') {
      contentType = 'text/html'
      filePath = path.join(filePath, 'sapper.html')
    } else {
      filePath = path.join(filePath, req.url)
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        fs.readFile(path.join(__dirname, '../dist', 'error.html'), (err, data) => {
          res.end(data)
        })
      } else {
        res.writeHead(200, { 'Content-Type': contentType })
        res.end(data)
      }
    })
  }
})

server.listen(3000, () => {
  console.log('Server has been started...')
})
