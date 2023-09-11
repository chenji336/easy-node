const cluster = require('cluster')
const http = require('http')
const numCpus = require('os').cpus().length

if (cluster.isMaster) {
  for (let i = 0; i < numCpus; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log('workder ' + worker.process.pid + ' died')
  })
  return
}

console.log('进入子进程:', process.pid)
http.createServer((req, res) => {
  console.log('访问子进程：', process.pid)
  res.writeHead(200)
  res.end('hello world \n')
}).listen(9999)