import useServerRequest from '../../hooks/useServerRequest'
import useForceUpdate from '../../hooks/useForceUpdate'

export default function useGameRequests(HOST, PORT, setStatus, setMe, setRoom, name) {
  const { serverRequest } = useServerRequest()
  const { forceUpdate } = useForceUpdate()

  function joinLobby(me, name) {
    setStatus("connecting lobby")
    const body = {player: {name: name}}
    serverRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/joinlobby", body)
      .then(data => {
        setMe(Object.assign(me, data.player))
        setStatus("join room")
      })
  }

  function joinRandomRoom(me) {
    setStatus("connecting room")
    const body = {player: me}
    serverRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/joinroom", body)
      .then(data => {
        setMe(Object.assign(me, data.player))
        setStatus("customization room")
      })
  }

  function getRoominf(me, room, status, setGrid) {
    const body = {player: me}
    serverRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/getroominf", body)
      .then(data => {
        setRoom(Object.assign(room, data.room))
        if (data.room.state == "game") {
          setGrid(data.room.game.grid)
        }
        if (data.room.state == "game" && status != "game") {
          setStatus("game")
        } else if (data.room.state == "wait" && status == "game") {
          setStatus("customization room")
          setGrid(null)
          // setRoom(Object.assign(room, {game: null}))
        }
        forceUpdate()
      })
  }

  function toggleReady(me) {
    const body = {player: me}
    serverRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/ready", body)
      .then(data => {
        setMe(Object.assign(me, data.player))
        forceUpdate()
      })
  }

  function sendMove(me, pos) {
    const body = {
      player: me,
      move: pos
    }
    serverRequest('POST', "http://" + HOST + ":" + PORT + "/gamerequest/makemove", body)
      .then(data => {
        console.log(data.log)
      })
  }

  return {
    joinLobby: joinLobby,
    joinRandomRoom: joinRandomRoom,
    getRoominf: getRoominf,
    toggleReady: toggleReady,
    sendMove: sendMove
  }
}
