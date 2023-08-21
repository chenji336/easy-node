function processBody(req, res) {
  if (!hasBody(req)) {
    return
  }

  const buffers = []

  req.on('data', chunk => {
    buffers.push(chunk)
  })

  req.on('end', () => {
    req.rawBody = Buffer.concat(buffers).toString()
  })
}

function hasBody(req) {
  return 'transfer-encoding' in req.headers || 'content-length' in req.headers
}