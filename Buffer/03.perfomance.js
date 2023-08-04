const http = require('http')

let sendMsg = ''

for (let i = 0; i < 1024 * 10; i ++) {
  sendMsg += 'a'
}

// 转成 buffer
sendMsg = Buffer.from(sendMsg) 

http.createServer((req, res) => {
  res.writeHead(200)
  res.end(sendMsg)
}).listen(8001)