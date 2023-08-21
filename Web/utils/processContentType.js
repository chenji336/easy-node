const queryString = require('query-string')
const xml2js = require('xml2js')
const formidable = require('formidable')

function processContentType(req, res) {
  const mime = getMime(req.headers['content-type'])
  if (mime === 'application/x-www-form-urlencoded') {
    req.body = queryString.parse(req.rawBody)
    return req;
  }

  if (mime === 'application/json') {
    try {
      req.body = JSON.parse(req.rawBody)
    } catch(e) {
      res.writeHead(400)
      res.end('Invalid JSON')
    }
    return
  }

  if (mime === 'application/xml') {
    xml2js.parseString(req.rawBody, (err, xml) => {
      if (err) {
        res.writeHead(400)
        res.end('Invalid XML')
      }

      req.body = xml
    })
    return
  }

  if (mime === 'multipart/form-data') {
    parseMultipart(req)
    return
  }
}

/**
 * 大致原理：
 * 1. content-type 中的 boundary 做为分隔符
 * 2. 按照 body 格式进行 string 解析
 * @param {*} req 
 */
function parseMultipart(req) {
  const form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    req.body = fields
    req.files = files
  })
}

// 获取 mime，需要注意 content-type 可能附带编码信息
// content-type: application/json;charset=utf-8
// content-type: multipart/form-data;boundary=AaB03x
function getMime(req) {
  return req.headers['content-type'].split(';')
}

console.log(
  processContentType({
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    rawBody: 'a=1&b=2&b=3'
  })
)