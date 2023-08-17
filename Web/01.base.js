const http = require('http')

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  res.end('Hello World\n')
}).listen(8888)

console.log('server runing in http://127.0.0.1:8888')