testBufferInt255();


function testBufferChar() {
  showBufferSize('陈') // 中文三个字符
  showBufferSize('a') // 英文一个字符

  function showBufferSize(char) {
    const buff = Buffer.from(char, 'utf-8') // 默认 utf-8
    console.log(char, buff, buff.length)
  }
}

function testBufferSize() {
  const buf = Buffer.alloc(5)
  console.log(buf) // 每个长度占用一个字节（两个八进制显示）
}

// buffer 每个字节是有符号整型， 0 ~ 255
function testBufferInt255() {
  const buf = Buffer.alloc(100)
  buf[20] = -100
  console.log('-100', buf[20]) // -100 + 256 = 156

  buf[1] = 3.14
  console.log('3.14', buf[1]) // 3

  buf[2] = 300
  console.log('300', buf[2]) // 300 - 256 = 44
}
