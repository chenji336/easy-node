const dgram = require('dgram')
const client = dgram.createSocket('udp4')
const msg = Buffer.from('深入浅出Node.js')

client.send(msg, 0, msg.length, 41234, 'localhost', (err, bytes) => {
  client.close()
})