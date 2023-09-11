// 使用 pm2 来调用
const http = require('http')

// console.log('进入子进程:', process.pid)
http.createServer((req, res) => {
  console.log('访问子进程：', process.pid)
  res.writeHead(200)
  res.end('hello world ' + process.pid)
}).listen(9999)