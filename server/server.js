const config = require('../config.json')
const PORT = config.port
const MONGOIP = config.mongoip

const http = require('http')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { Player, PlayerManager, Room, RoomManager } = require('./multiplayer/multiplayer')
const roomManager = new RoomManager()
const playerManager = new PlayerManager()

const MongoClient = require("mongodb").MongoClient
const mongoClient = new MongoClient(
  "mongodb://mongo-root:root@"+MONGOIP+":27017/?authSource=admin&readPreference=primary",
  { useUnifiedTopology: true }
)
let db, users, records
mongoClient.connect(function(err, client) {
    if (err) {
      throw err
    }
    db = client.db("nostalgic-games-hub-db")
    users = db.collection("test")
    records = db.collection("records")
})

const AuthRequests = require('./requests/AuthRequests')


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
    if (requestUrl[1] == 'joinlobby') {
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
          const log = room.changeReady(player)
          let result = {
            player: player,
            log: log
          }
          res.end(JSON.stringify(result))
        })
    } else if (requestUrl[1] == 'makemove') {
      getBody(req)
        .then(data => {
          const room = roomManager.getRoomById(data.player.roomid)
          const player = playerManager.getPlayerById(data.player.id)
          const log = room.move(data.move.y, data.move.x, player)
          const result = {
            log: log
          }
          res.end(JSON.stringify(result))
        })
    }

  } else if (requestUrl[0] == 'auth') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    if (requestUrl[1] == 'login') {
      AuthRequests.login(req, users, bcrypt, jwt)
        .then(result => {
          res.end(JSON.stringify(result))
        })
    } else if (requestUrl[1] == 'reg') {
      AuthRequests.reg(req, users, records, bcrypt)
        .then(result => {
          res.end(JSON.stringify(result))
        })
    } else if (requestUrl[1] == 'records') {
      AuthRequests.records(req, records)
        .then(recordsData => {
          res.end(JSON.stringify(recordsData))
        })
    } else if (requestUrl[1] == 'updaterecords') {
      AuthRequests.updateRecords(req, records)
        .then(data => {
          res.end(JSON.stringify(data))
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
      filePath = path.join(filePath, 'snake.html')
    } else if (req.url == '/sapper') {
      contentType = 'text/html'
      filePath = path.join(filePath, 'sapper.html')
    } else if (req.url == '/tetris') {
      contentType = 'text/html'
      filePath = path.join(filePath, 'tetris.html')
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


server.listen(PORT, () => {
  console.log(`Server has been started on ${PORT} port...`)
})














//
