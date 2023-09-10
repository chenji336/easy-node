const cp = require('child_process')
const child1 = cp.fork('child.js')
const child2 = cp.fork('child.js')
const server = require('net').createServer({
  pauseOnConnect: true
})

// server.on('connection', socket => {
//   socket.end('handled by parent\n')
// })

server.listen(8124, () => {
  child1.send('server', server)
  child2.send('server', server)
  server.close();
})

// test: node .\NetWork\tcp\client.js(curl 有点问题)