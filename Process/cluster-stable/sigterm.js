// 信号事件：https://nodejs.cn/api/process/signal_events.html

// Windows 上不支持 SIGTERM，可以监听
process.on('SIGTERM', () => {
  console.log('Got a SIGTERM, exiting...')
  setTimeout(() => {
    process.exit(1)
  }, 1000);
})

console.log('server runing with PID:', process.pid)

// setTimeout(() => {
//   process.kill(process.pid, 'SIGTERM')
// }, 2000);

require('http').createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  res.end('hello')
}).listen(8888)

console.log('runing in http://localhost:8888/')

