const sessions = {}
const key ='session_id'
const EXPIRES = 20 * 60 * 1000

function generate() {
  const session = {}
  session.id = Date.now() + Math.random()
  session.cookie = {
    expire: Date.now() + EXPIRES
  }

  sessions[session.id]  = session

  return session
}

function processSession(cookies) {
  const id = cookies[key]
  if (!id) {
    return generate()
  }

  const session = sessions[id]
  if (!session) {
    return generate()
  }

  if (session.cookie.expire < Date.now()) {
    delete session[id]
    return  generate()
  }

  session.cookie.expire = Date.now() + EXPIRES
  return session
}

exports.processSession = processSession

exports.key = key