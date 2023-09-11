const path = require('path')
const fork = require('child_process').fork
const cpus = require('os').cpus()
const server = require('net').createServer()
server.listen(9999)

/** 重启次数 */
const limit = 10
/** 时间单位 */
const during = 60000
/** 重启的进程个数 */
let restart = []

/** 是否频繁启动 */
const isFrequnetyly = () => {
  const now = Date.now()
  const len = restart.push(now)
  if (len > limit) {
    restart = restart.slice(len - limit)
  }
  // 重启个数超过 limit 并且在 during 时间内
  return len >= limit && restart[len - 1] - restart[0] < during
}

const workers = {}
const createWorker = () => {
  const worker = fork(path.join(__dirname, 'child.js'))
  
  if (isFrequnetyly()) {
    // giveup 比 uncaughtException 严重，表示集群中没有任何进程服务了，不再进行重启
    process.emit('giveup')
    return
  }

  // 句柄发送
  worker.send('server',server)
  workers[worker.pid] = worker
  console.log('Create worker. pid:', worker.pid)

  // 启动新进程
  worker.on('message', message => {
    if (message.act === 'suicide') {
      createWorker()
    }
  })

  // 退出
  worker.on('exit', () => {
    console.log('Worker', worker.pid, 'exited.')
    delete workers[worker.pid]
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