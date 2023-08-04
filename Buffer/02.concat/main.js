// buffer 的拼接学习

const fs = require('fs')

// concat('english.md')
// concat(
//   'chinese.md',
//   true
// )
concatBestPractices('chinese.md')

function concat(fileName, isSetEncodingUtf8) {
  const rs = fs.createReadStream(fileName, {
    highWaterMark: 11 // 每次读取的长度是 11,为了模拟乱码出现的情况
  })
  let data = ''


  // setEncoding 让 data 接收的是编码后的字符串，则不会出现 ？乱码。但是该该方法不是万能的，因为支持的编码格式有限
  // 具体原因可以参考：setEncodingSource.js
  isSetEncodingUtf8 && rs.setEncoding('utf-8')

  rs.on('data', chunk => {
    // data 事件默认传递过来的是 Buffer
    // 上面限制每次发送 11 字节长度的 Buffer，每个中文三个字节，没有三个的则只能以 ？ 乱码显示了
    console.log('获取 chunk：', chunk.toString())
    data += chunk
  })

  rs.on('end', () => {
    console.log('读取完成: ', data)
  })
}

// concat 最佳实践
function concatBestPractices(fileName) {
  const rs = fs.createReadStream(fileName, {
    highWaterMark: 11
  })
  const chunks = []
  let size = 0

  rs.on('data', chunk => {
    chunks.push(chunk)
    size += chunk.length
    console.log('size: ', size)
  })

  rs.on('end', () => {
    const buf = Buffer.concat(chunks)
    console.log('读取完成: ', buf.toString())
  })
}

// 也可以自己模拟下 Buffer.concat 的实现
// 关键代码: 
// - length 长度计算
// - buf.copy(buffer, pos)