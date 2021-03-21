const { getBody } = require('./getBody.js')
const GameRequests = require('./GameRequests')

async function gameRequestsHandler(requestUrl, req, res, playerManager, roomManager) {
  try {
    const data = await getBody(req)
    let result = { log: "server error" }
    if (requestUrl[1] == 'joinlobby') {
      result = await GameRequests.joinlobby(data, playerManager, roomManager)
    } else if (requestUrl[1] == 'lobbyinf') {
      result = await GameRequests.lobbyinf(data, playerManager, roomManager)
    } else if (requestUrl[1] == 'joinroom') {
      result = await GameRequests.joinroom(data, playerManager, roomManager)
    } else if (requestUrl[1] == 'getroominf') {
      result = await GameRequests.getroominf(data, playerManager, roomManager)
    } else if (requestUrl[1] == 'ready') {
      result = await GameRequests.ready(data, playerManager, roomManager)
    } else if (requestUrl[1] == 'makemove') {
      result = await GameRequests.makemove(data, playerManager, roomManager)
    }
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } catch (e) {
    console.log(e)
  }
}

module.exports = { gameRequestsHandler }
