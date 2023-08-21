const net = require('net')

const client = net.connect(8124, 'localhost', () => {
  console.log('client connected')
  client.write('world! \r\n')
})

client.on('data', data => {
  console.log('data:', data.toString())
  client.end()
})

client.on('end', () => {
  console.log('client disconnected')
})