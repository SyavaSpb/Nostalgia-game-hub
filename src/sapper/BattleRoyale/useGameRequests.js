import useServerRequest from '../../hooks/useServerRequest'
import useForceUpdate from '../../hooks/useForceUpdate'

export default function useGameRequests(HOST, PORT, setMe, setRoom) {
  const { serverRequest } = useServerRequest()
  const { forceUpdate } = useForceUpdate()

  function joinLobby(name) {
    const body = {player: {name: name}}
    serverRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/joinlobby", body)
      .then(data => {
        console.log("jl", data)
        setMe(data.player)
      })
  }

  function lobbyInf(me, setLobby) {
    const body = {player: me}
    serverRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/lobbyinf", body)
      .then(data => {
        console.log("li", data)
        setLobby(data.lobby)
      })
  }

  function joinRandomRoom(me) {
    const body = {player: me}
    serverRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/joinroom", body)
      .then(data => {
        console.log("jrr", data)
        setMe(data.player)
      })
  }

  function getRoominf(me) {
    const body = {player: me}
    serverRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/getroominf", body)
      .then(data => {
        console.log("gri", data)
        setRoom(data.room)
        // if (data.room.state == "game") {
        //   setGrid(data.room.game.grid)
        // }
        // if (data.room.state == "game" && status != "game") {
        //   setStatus("game")
        // } else if (data.room.state == "wait" && status == "game") {
        //   setStatus("customization room")
        //   setGrid(null)
        //   // setRoom(Object.assign(room, {game: null}))
        // }
        // forceUpdate()
      })
  }

  function toggleReady(me) {
    const body = {player: me}
    serverRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/ready", body)
      .then(data => {
        console.log("tr", data)
        setMe(data.player)
      })
  }

  function sendMove(me, pos) {
    const body = {
      player: me,
      move: pos
    }
    console.log(body)
    serverRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/makemove", body)
      .then(data => {
        console.log("sm", data.log)
      })
  }

  return {
    joinLobby: joinLobby,
    lobbyInf: lobbyInf,
    joinRandomRoom: joinRandomRoom,
    getRoominf: getRoominf,
    toggleReady: toggleReady,
    sendMove: sendMove
  }
}
