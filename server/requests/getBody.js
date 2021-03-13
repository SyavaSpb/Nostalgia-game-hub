 async function getBody(req) {
  let body = '';
  req.on('data', chunk => body += chunk.toString())
  data = await new Promise(r => req.on('end', () => r(JSON.parse(body))))
  return data
}

module.exports = { getBody }
