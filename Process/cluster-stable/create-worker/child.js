const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  })
  res.end('handled by child, child is ' + process.pid + '\n')
  throw new Error('mock exception')
})

let worker
process.on('message', (m, tcp) => {
  if (m === 'server') {
    worker = tcp
    worker.on('connection', socket => {
      server.emit('connection', socket)
    })
  }
})

process.on('uncaughtException', (err) => {
  // 记录关键日志（知道什么原因导致的异常）
  console.log('err:', err)

  // 断开连接之前告诉 master，让 master 提前创建 worker
  process.send({
    act: 'suicide'
  })

  // 停止接收新的连接
  // 测试发现：第二次错误调用才会触发（真实情况待定）
  worker.close(() => {
    console.log('worker close')
    // 已有的所有连接断开后，退出进程
    process.exit(1)
  })

  // 超时处理
  setTimeout(() => {
    process.exit(1)
  }, 5000);
})