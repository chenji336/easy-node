// cluster.js
const cluster = require('cluster');

cluster.setupMaster({
  exec: 'worker.js',
});

const cpus = require('os').cpus();
for (var i = 0; i < cpus.length; i++) {
  cluster.fork();
}
