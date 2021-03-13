const { getBody } = require('./getBody.js')
const AuthRequests = require('./AuthRequests')

async function authRequestsHandler(requestUrl, req, res, usersdb, recordsdb) {
  try {
    const data = await getBody(req)
    let result = { log: "server error" }
    if (requestUrl[1] == 'login') {
      result = await AuthRequests.login(data, usersdb)
    } else if (requestUrl[1] == 'reg') {
      result = await AuthRequests.reg(data, usersdb, recordsdb)
    } else if (requestUrl[1] == 'records') {
      result = await AuthRequests.records(data, recordsdb)
    } else if (requestUrl[1] == 'updaterecords') {
      result = await AuthRequests.updateRecords(data, recordsdb)
    }
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(result))
  } catch (e) {
    console.log(e)
  }
}

module.exports = { authRequestsHandler }
