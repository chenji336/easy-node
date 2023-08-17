const url = require('url')
const fs = require('fs')
const path = require('path')

// 路径解析
// 场景：
//   - 可以用来请求静态文件
//   - 路径选择控制器
function processPath(req, res) {
  const urlParse = url.parse(req.url)

  /**
   * http://127.0.0.1:8888/chenji/336?a=123#bbb 解析后如下
   * {
      protocol: null,
      slashes: null,
      auth: null,
      host: null,
      port: null,
      hostname: null,
      hash: null,
      search: '?a=123',
      query: 'a=123',
      pathname: '/chenji/336',
      path: '/chenji/336?a=123',
      href: '/chenji/336?a=123' 
    }
   */
  console.log('path:', urlParse)
  if (urlParse.pathname.includes('assets')) {
    return getStaticFile(req, res);
  }

  if (urlParse.pathname.includes('api')) {
    return getControllerAction(req, res, urlParse)
  }
  
  return '';
}

function getStaticFile(req, res, urlParse) {
  const file = fs.readFileSync(path.join(__dirname, urlParse.pathname), {
    encoding: 'utf-8'
  })
  console.log('file:', file)
  return file;
}

const handles = {
  api: {
    test: (req, res, ...args) => {
      return JSON.stringify({
        controller: 'api',
        action: 'test'
      })
    }
  }
}

/* 根据路径获取 api 处理逻辑结果 */
function getControllerAction(req, res, urlParse) {
  const pathname = urlParse.pathname;
  const paths = pathname.split('/')
  const controller = paths[1] || 'index'
  const action = paths[2] || 'index'
  const args = paths.slice(3)

  return handles[controller][action].apply(null, [req, res, ...args])
}

exports.processPath = processPath;