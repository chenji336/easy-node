const http = require('http')
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  res.end('handled by child, pid is ' + process.pid + '\n')
})

process.on('message', (m, tcp) => {
  if (m === 'server') {
    console.log('pid:', process.pid)
    tcp.on('connection', socket => {
      console.log(process.pid, 'connect')
      server.emit('connection', socket)
    })
  }
})