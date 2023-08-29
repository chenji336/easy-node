const crypto = require('crypto');
// 来自 req.header.Sec-Websocket-Key
const secWebsocketKey = 'jS+0abOxmDlZeQ8Ba9LbjA=='
const key = secWebsocketKey + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const val = crypto.createHash('sha1').update(key).digest('base64');

/**
 * val === res.header.Sec-Websocket-Accept (浏览器接收的响应头 Sec-WebScoket-Accept 相等)
 */
console.log('val:', val);


