// 加密目的：防止 session_id 被修改

const crypto = require('crypto')

/**
 * 
 * @param {*} val 加密的原值 
 * @param {*} secret 私钥
 * @returns 
 */
function sign(val, secret) {
  const valSecret = crypto.createHmac('sha256', secret)
    .update(val)
    .digest('base64')
    .replace(/\=+$/, '')
  return `${val}.${valSecret}`
}

/**
 * 
 * @param {*} val 加密后的值 
 * @param {*} secret 密钥
 * @returns 
 */
function unsign(val, secret) {
  const str = val.split('.')[0]
  return sign(str, secret) === val ? str : false
}

console.log(
  sign('123', 'test')
)

console.log(
  unsign('123.FKJxXTWyVAcMshXrtwE+2YjTgpRcKzbdtZkSFO95x5Y', 'test')
)