const http = require('http')
const fs = require('fs')
const path = require('path')


const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url)
  console.log(filePath)
  const ext = path.extname(filePath)
  let contentType = 'text/plain'
  if (ext == 'js') {
    contentType = 'text/javasript'
  } else if (ext == 'css') {
    contentType = 'text/css'
  }

  if (req.url == '/') {
    filePath = path.join(filePath, 'index.html')
    contentType = 'text/html'
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err
    } else {
      res.writeHead(200, {
        'Content-Type': contentType
      })
      res.end(data)
    }
  })
})

server.listen(3000, () => {
  console.log('Server has been started...')
})
