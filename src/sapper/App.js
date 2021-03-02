import React, {useState, useRef, useEffect} from 'react'
import {useAuth} from '../index/useAuth'
import Header from '../components/header'
import MainBlock from './MainBlock'
import InformationBlock from './InformationBlock'
const cloneDeep = require('lodash.clonedeep');
const config = require('../../config.json')

function useServerRequest(method, url, body = null) {
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

function useForceUpdate() {
  const [tmp, setTmp] = useState(-1)
  function forceUpdate() {
    setTmp(Math.random())
  }
  return {
    forceUpdate: forceUpdate
  }
}

export default function App() {
  const PORT = config.port
  const HOST = config.host
  const { userData, token } = useAuth()
  const isAuthenticated = token != null
  const [status, setStatus] = useState("choose game mode")
  const [room, setRoom] = useState({})
  const [me, setMe] = useState({})
  const requester = useRef()
  const { forceUpdate } = useForceUpdate()


  const sleep = ms =>
    new Promise(resolve => setTimeout(() => resolve(), ms))

  function joinLobby() {
    setStatus("connecting lobby")
    const body = {player: {name: userData.login}}
    useServerRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/joinlobby", body)
      .then(data => {
        setMe(Object.assign(me, data.player))
        setStatus("join room")
      })
  }

  useEffect(() => {
    if (status == "customization room") {
      requester.current = setInterval(getRoominf, 200)
    } else if (status == "game") {
      clearInterval(requester.current)
      requester.current = setInterval(getRoominf, 200)
    }
  }, [status])

  function joinRandomRoom() {
    setStatus("connecting room")
    const body = {player: me}
    useServerRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/joinroom", body)
      .then(data => {
        setMe(Object.assign(me, data.player))
        setStatus("customization room")
      })
  }

  function getRoominf() {
    const body = {player: me}
    useServerRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/getroominf", body)
      .then(data => {
        setRoom(Object.assign(room, data.room))
        if (data.room.state == "game" && status != "game") {
          setStatus("game")
        } else if (data.room.state == "wait" && status == "game") {
          setStatus("customization room")
        }
        forceUpdate()
      })
  }

  function toggleReady() {
    const body = {player: me}
    useServerRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/ready", body)
      .then(data => {
        setMe(Object.assign(me, data.player))
        forceUpdate()
      })
  }

  function getGameInf() {
    const body = {player: me}
    useServerRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/getgameinf", body)
      .then(data => {
        setRoom(Object.assign(room, data.room))
        forceUpdate()
      })
  }

  function sendMove(pos) {
    const body = {
      player: me,
      move: pos
    }
    useServerRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/makemove", body)
      .then(data => {
        console.log(data.log)
      })
  }

  return (
    <div className="container">
      <Header title={"sapper"}/>
      <div className="separate">
        <InformationBlock
          isAuthenticated={isAuthenticated}
          status={status}
          userData={userData}
          toggleReady={toggleReady}
          room={room}
        />

        <MainBlock
          isAuthenticated={isAuthenticated}
          status={status}
          joinLobby={joinLobby}
          joinRandomRoom={joinRandomRoom}
          room={room}
          sendMove={sendMove}
        />
      </div>
    </div>
  )
}
