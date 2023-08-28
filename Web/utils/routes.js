const url = require('url')
const routes = []

/** start-手工映射 */

const use = (path, action) => {
  routes.push([pathRegexp(path), action])
}

function processRoute(req, res) {
  const pathname = url.parse(req.url).pathname

  for(let i = 0; i < routes.length; i++) {
    const route = routes[i]
    const matched = route[0].regexp.exec(pathname)
    const key = route[0].key
    req.params = {
      [key]: matched[1] // => path 变量序列化成对象 {username: 'chenji'}
    }
    if (matched) {
      const action = route[1]
      action(req, res)
      return
    }
  }

  // 处理 404 请求
  // todo...
}


use('/profile/:username', (req, res) => {
 // 编写接口逻辑
})

// 处理正则
// /profile/:username => /profile/jacksontian,/profile/hoover 
// /user.:ext => /user.xml /user.json
function pathRegexp(path) {
  const isContainVariable = path.includes(':')
  if (!isContainVariable) {
    return path
  }
  const paths = path.split(':')
  return {
    key: paths[1],
    regexp: new RegExp(`${paths[0]}(\\w+)`)
  }
}

function testPathRegexp() {
  console.log(
    pathRegexp('/profile/:username').exec('/profile/jacksontian'),
    pathRegexp('/user.:ext').exec('/user.xml'),
  )
}

testPathRegexp()

/** end-手工映射 */

/** start-自然映射 */

// 自然映射就是没有路由表，path 就自动对应着路由
// /user/setting/12/1987 => user module 下的 setting 方法，参数是后面

function processAutoRoute(req, res) {
  const pathname = url.parse(req.url).pathname
  const paths = pathname.split('/')
  const controller = paths[1] || 'index'
  const action = paths[2] || 'index'
  const args = paths.slice(3)
  
  let module
  try {
    module = require(`./controllers/${controller}`)
  } catch(ex) {
    // 错误处理
    return
  }
  const method = module[action]
  if (method) {
    method.apply(null, [req, res, ...args])
  } else {
    // 错误处理
    return
  }
}

/** end-自然映射 */