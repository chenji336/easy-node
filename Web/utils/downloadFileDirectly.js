const fs = require('fs');
const mime = require('mime');
const path = require('path');

function sendfile(req, res, filepath) {
  fs.stat(filepath, (err, stat) => {
    // console.log('stat:', stat);
    const stream = fs.createReadStream(filepath);
    res.setHeader('Content-Type', mime.getType(filepath));
    res.setHeader('Content-Length', stat.size);
    res.setHeader(
      'Content-Disposition',
      `attachment;filename=${path.basename(filepath)}`
    );
    res.writeHead(200);
    stream.pipe(res);
  });
}

// test sendfile
const http = require('http');
http
  .createServer((req, res) => {
    sendfile(req, res, path.join(__dirname, 'body.js'));
  })
  .listen(9999);
console.log('server runing in http://localhost:9999/');
