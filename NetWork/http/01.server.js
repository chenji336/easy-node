const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'text/plain'
  })
  res.end('hello world')
}).listen(1228)

console.log('server runing http://localhost:1228/')