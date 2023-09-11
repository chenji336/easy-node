const path = require('path')
const fork = require('child_process').fork
const cpus = require('os').cpus()
const server = require('net').createServer()
server.listen(9999)

const workers = {}
const createWorker = () => {
  const worker = fork(path.join(__dirname, 'child.js'))
  
  // 句柄发送
  worker.send('server',server)
  workers[worker.pid] = worker
  console.log('Create worker. pid:', worker.pid)

  // 退出重新启动新进程
  worker.on('exit', () => {
    console.log('Worker', worker.pid, 'exited.')
    delete workers[worker.pid]
    createWorker()
  })
}

for (let i = 0; i < cpus.length; i++) {
  createWorker()
}

// 父进程推出时候，所有子进程都退出
process.on('exit', () => {
  for (let pid in workers) {
    workers[pid].kill()
  }
})