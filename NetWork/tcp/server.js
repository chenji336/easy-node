const net = require('net')

const server = net.createServer(socket => {
  socket.on('data', data => {
    console.log('data:', data.toString())
    socket.write('你好')
  })

  socket.on('end', () => {
    console.log('连接断开')
  })

  socket.write('欢迎光临')

  // echo 服务，客户端发什么，服务端就发什么，一般测试服务是否完好
  socket.pipe(socket) 
})

// connection 侦听器
// 不仅可以监听 port 还可以监听 domain socket,比如 '/tmp/echo.socket'
server.listen(8124, () => {
  console.log('server bound on 8124')
})