function parseCookie(cookie) {
  const res = {}

  console.log('cookie:', cookie)
  if (!cookie) {
    return res
  }

  const cookies = cookie.split(';')
  cookies.forEach(item => {
    const items = item.split('=')
    res[items[0].trim()] = items[1]
  })

  console.log('parseCookie:', res)

  return res
}

function serialize(name, val, opt = {}) {
  const pairs = [`${name}=${encodeURI(val)}`]
  const keyMap = {
    maxAge: 'Max-Age', // 过期时长
    domain: 'Domain', // 类似域名（一级、二级之类的）
    path: 'Path', // 作用路径
    expires: 'Expires', // 过期时间
    httpOnly: 'HttpOnly', // 不能在浏览器修改
    secure: 'Secure' // 安全，true 只允许 https
  }

  function getKeyValue(key) {
    if (key === 'expires') {
      return opt[key].toUTCString()
    }

    return opt[key]
  }

  Object.keys(opt).forEach(key => {
    key && pairs.push(`${keyMap[key]}=${getKeyValue(key)}`)
  })

  return pairs.join(';')
}

exports.parseCookie = parseCookie
exports.serialize = serialize