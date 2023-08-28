/**
 * RESTful
 * - 路径：代表资源
 * - 方法：代表操作
 * - Accept和 content-type：代表返回类型
 */

const routes = {
  all: []
}
const app = {}
const use = (method, path, action) => {
  routes[method].push([pathRegexp(path)], action)
}

app.use = (path, action) => use('all', path, action)

['get', 'put', 'delete', 'post'].forEach(method => {
  routes[method] = []
  app[methods] = (path, action) => use(method, path, action)
})

// 开始使用
app.post('/user/:username', addUser)
app.delete('user/:username', removeUser)
app.put('/user/:username', updateUser)
app.get('/user/:username', getUser)