const http = require('http');
const url = require('url');

const { processPath } = require('./utils/processPath');
const { parseCookie, serialize } = require('./utils/processCookie');
const { processSession, key } = require('./utils/session');

let text = '';

http
  .createServer((req, res) => {
    const pathRes = processPath(req, res);
    processMethod(req, res);
    processQuery(req, res);
    req.cookie = parseCookie(req.headers.cookie);
    text = req.cookie.isVisit ? '再次相见，格外想念\n' : '第一次进入\n';

    const cookies = !req.cookie.isVisit && [
      serialize('isVisit', '1'),
      serialize('other', 'array'),
    ] || [];
    const session = processSession(req.cookie);
    cookies.push(serialize(key, session.id))
    res.setHeader('Set-Cookie', cookies);

    res.writeHead(200, {
      'Content-Type': 'text/plain;charset=utf-8', // 防止乱码
    });
    res.end(pathRes ? pathRes : text);
  })
  .listen(8888);

console.log('server runing in http://127.0.0.1:8888');

function processMethod(req, res) {
  // 根据 method 不同调用不同的函数
  console.log('method:', req.method);
}

// 检查字符串
function processQuery(req, res) {
  const query = url.parse(req.url, true); // 添加 true 之后，query 就会变成 object 形式
  console.log('query:', query); // http://127.0.0.1:8888/api/test?a=1&b=chen&b=ji => {a: '1', b: ['chen', 'ji']}
}
