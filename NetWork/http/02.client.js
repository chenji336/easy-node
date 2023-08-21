// nodejs 官网：https://nodejs.cn/api/http/http_request_url_options_callback.html

const http = require('http')

// 为了重用 tcp 连接，需要代理，默认 http 请求数5（串行，实质是个连接池）
const agent = new http.Agent({
  maxSockets: 10, // default: 5
})

const options= {
  hostname: 'localhost',
  port: 1228,
  path: '/',
  method: 'GET',
  agent, // 设置 false，则不限制连接个数 https://zhuanlan.zhihu.com/p/364933177
}

const req = http.request(options, res => {
  console.log('status:', res.statusCode)
  console.log('headers:', res.headers)

  res.setEncoding('utf8')
  res.on('data', chunk => {
    console.log('chunk:', chunk)
  })
})

req.end()