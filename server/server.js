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
let db, collection
mongoClient.connect(function(err, client) {
    if (err) {
      throw err
    }
    db = client.db("nostalgic-games-hub-db");
    collection = db.collection("test");
    // const user = { name: "Ivan1" }
    // collection.insertOne(user)
    // client.close();
})

{
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
}


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
  } else if (requestUrl[0] == 'auth') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    if (requestUrl[1] == 'login') {
      getBody(req)
        .then(data => {
          const {login, password} = data
          let userid
          new Promise((resolve, reject) => {
            resolve(collection.findOne({login: login}))
          })
          .then(user => {
            if (user) {
              userid = user._id
              return bcrypt.compare(password, user.password)
            } else {
              res.end("user isn't found")
              throw new Error()
            }
          }).then(isRightPassword => {
            if (isRightPassword) {
              const token = jwt.sign(
                { userid: userid },
                config.jwtSecret,
                { expiresIn: "1h" }
              )
              res.end(JSON.stringify({ token: token, userid: userid }))
            } else {
              res.end("invalid password")
              throw new Error()
            }
          })
          .catch(() => {})
        })
    } else if (requestUrl[1] == 'reg') {
      getBody(req)
        .then(data => {
          const {login, password} = data
          new Promise((resolve, reject) => {
            if (login.length < 5) {
              res.end("login must be more than 4 symbols")
              reject()
            } else if (login.length > 12) {
              res.end("login must be less than 12 symbols")
              reject()
            } if (password.length < 5) {
              res.end("password must be more than 5 symbols")
              reject()
            } else if (password.length > 12) {
              res.end("password must be less than 12 symbols")
              reject()
            }
            resolve(collection.find({login: login}).toArray())
          })
          .then(result => {
            if (result.length > 0) {
              res.end("login exist")
              throw new Error()
            }
            return bcrypt.hash(password, 12)
          })
          .then(hashedPassword => {
            const user = {
              login: login,
              password: hashedPassword
            }
            collection.insertOne(user)
            return "user was added"
          })
          .then(log => {
            res.end(log)
          })
          .catch(() => {})

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


server.listen(PORT, () => {
  console.log(`Server has been started on ${PORT} port...`)
})














//
