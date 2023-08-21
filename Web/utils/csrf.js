// 跨站脚本攻击
// 常见处理方式：只能在特定的网站域名下提交，攻攻击者的网站不在白名单，因此不行

// 本章给出解决方案：session 生成随机 _csrf 字段，前端保存在 form 表单隐藏字段中，每次携带过去做校验


// Math.random 依赖弱伪随机数，不安全
function generateRandom(len) {
  return crypto.randomBytes(Math.ceil(len * 3 / 4))
    .toString('base64')
    .slice(0, len)
}