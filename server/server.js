const http = require('http')
const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const config = require('../config.json')
const PORT = config.port
const MONGOIP = config.mongoip

const { Player, PlayerManager, Room, RoomManager } = require('./multiplayer/multiplayer')
const roomManager = new RoomManager()
const playerManager = new PlayerManager()

const MongoClient = require("mongodb").MongoClient
const mongoClient = new MongoClient(
  "mongodb://mongo-root:root@" + MONGOIP + ":27017/?authSource=admin&readPreference=primary",
  { useUnifiedTopology: true }
)
let db, usersdb, recordsdb
mongoClient.connect(function(err, client) {
    if (err) {
      throw err
    }
    db = client.db("nostalgic-games-hub-db")
    usersdb = db.collection("test")
    recordsdb = db.collection("records")
})


const AuthRequests = require('./requests/AuthRequests')
const { gameRequestsHandler } = require('./requests/gameRequestsHandler.js')
const { authRequestsHandler } = require('./requests/authRequestsHandler.js')


const server = http.createServer((req, res) => {
  const requestUrl = req.url.split('/')
  requestUrl.splice(0, 1)

  if (requestUrl[0] == 'gamerequest') {
    gameRequestsHandler(requestUrl, req, res, playerManager, roomManager)
  } else if (requestUrl[0] == 'auth') {
    authRequestsHandler(requestUrl, req, res, usersdb, recordsdb)
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
