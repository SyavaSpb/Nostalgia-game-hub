const config = require('../config.json').dev
const PORT = config.port
const HOST = config.host

import './css/pages/sapper.css'
import { Sapper } from './sapper.js'

let me = {}, room
let requestRoomState
let sapper

function sendRequest(method, url, body = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.responseType = 'json'
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = function() {
      resolve(xhr.response)
    }
    xhr.send(JSON.stringify(body))
  })
}

function roomWaitingState(room) {
  const readyBlock = document.querySelector('.mainBlock__ready')
  if (readyBlock.classList.contains('hide')) {
    readyBlock.classList.remove('hide')
  }
  const board = document.querySelector('.mainBlock__game')
  if (!board.classList.contains('hide')) {
    board.classList.add('hide')
  }
  const playerList = document.querySelector('.information__players')
  while (playerList.firstChild) {
    playerList.removeChild(playerList.firstChild);
  }
  room.players.forEach((player, i) => {
    const h = document.createElement('h')
    h.classList.add('information__player', 'text-teletoon', 'text-m', 'text-white')
    if (player.ready) {
      h.classList.add('back-orange')
    } else {
      h.classList.add('back-red')
    }
    h.innerText = `${i + 1}. ${player.name}`
    playerList.appendChild(h)
  })
}

function initGame() {
  const readyBlock = document.querySelector('.mainBlock__ready')
  readyBlock.classList.add('hide')
  const board = document.querySelector('.mainBlock__game')
  if (board.classList.contains('hide')) {
    board.classList.remove('hide')
  }
  const canvas = document.querySelector('#game')
  sapper = new Sapper(canvas)
  canvas.onmousedown = function() {
    const x = event.pageX - canvas.getBoundingClientRect().left
    const y = event.pageY - canvas.getBoundingClientRect().top
    const cellSize = canvas.clientWidth / 8
    const i = Math.floor(y / cellSize)
    const j = Math.floor(x / cellSize)
    const body = {
      player: me,
      move: {x: j, y: i}
    }
    sendRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/makemove", body)
      .then(data => {
        console.log(data.log)
      })
  }
}

function roomPlay(room) {
  sapper.setGrid(room.game.grid)
  sapper.draw()
}

function gameReq() {
  const body = {
    player: me
  }
  sendRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/getgameinf", body)
    .then(data => {
      roomPlay(data.room)
      const playerList = document.querySelector('.information__players')
      while (playerList.firstChild) {
        playerList.removeChild(playerList.firstChild);
      }
      data.room.players.forEach((player, i) => {
        const h = document.createElement('h')
        h.classList.add('information__player', 'text-teletoon', 'text-m', 'text-white')
        if (player.isLoose) {
          h.classList.add('back-red')
        } else if (player.isMove) {
          h.classList.add('back-orange')
        }
        h.innerText = `${i + 1}. ${player.name}`
        playerList.appendChild(h)
      })
    })
}

function roomReq() {
  const body = {
    player: me
  }
  sendRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/getroominf", body)
    .then(data => {
      if (data.room.state == "wait") {
        roomWaitingState(data.room)
        sapper = null
      } else if (data.room.state == "init") {
        // initGame(room)
      } else if (data.room.state == "game") {
        // clearInterval(requestRoomState)
        if (!sapper) {
          initGame()
        }
        // requestRoomState = setInterval(gameReq, 200)
        gameReq()
      }
    })
}


const buttonAuth = document.querySelector('.mainBlock__buttonAuth')
buttonAuth.onclick = function() {
  const nameFromInput = document.querySelector('.mainBlock__inputName').value
  if (nameFromInput.length >= 5) {
    me.name = nameFromInput.toString()
    const body = {
      player: me
    }
    sendRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/getid", body)
      .then(data => {
        me = data.player
        const authBlock = document.querySelector('.mainBlock__auth')
        authBlock.classList.add('hide')

        const joinBlock = document.querySelector('.mainBlock__joinRoom')
        joinBlock.classList.remove('hide')

        const infNick = document.querySelector('.information__nickname')
        infNick.innerText = me.name

        const inf = document.querySelector('.information__profile')
        inf.classList.remove('hide')
      })
  }
}

const buttonJoin = document.querySelector('.mainBlock__buttonJoin')
buttonJoin.onclick = function() {
  const body = {player: me}
  sendRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/joinroom", body)
    .then(data => {
      const joinBlock = document.querySelector('.mainBlock__joinRoom')
      joinBlock.classList.add('hide')
      const infPlayers = document.querySelector('.information__players')
      infPlayers.classList.remove('hide')
      me = data.player
      // const readyBlock = document.querySelector('.mainBlock__ready')
      // readyBlock.classList.remove('hide')
      // const board = document.querySelector('.mainBlock__game')
      // board.classList.remove('hide')
      requestRoomState = setInterval(roomReq, 200)
    })
}

const readyButton = document.querySelector('.mainBlock__buttonReady')
readyButton.onclick = function() {
  const body = {player: me}
  sendRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/ready", body)
    .then(data => {
      me = data.player
    })
}




















//
