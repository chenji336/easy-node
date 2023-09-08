const cp = require('child_process');

cp.spawn('node', ['./worker.js']) // 不显示 worker 中日志

// cp.exec('node worker.js', (err, stdout, stderr) => { // 不显示 worker 中日志
//   console.log('err:', err)
//   console.log('stdout:', stdout)
//   console.log('stderr:', stderr)
// })

// 可执行文件，比如 exe
// cp.execFile('worker.js', (err, stdout, stderr) => {
//   // 不显示 worker 中日志
//   console.log('err:', err);
//   console.log('stdout:', stdout);
//   console.log('stderr:', stderr);
// });

// cp.fork('./worker.js') // 显示 worker 中日志
