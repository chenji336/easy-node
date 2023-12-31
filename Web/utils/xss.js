// 注入 script 获取 js
// 如果真的被获取了 cookie，如果后台会通过检查 **浏览器的部分信息做为加密**（除非浏览器信息一样），那还是可以防住

// 一般处理方式：特殊字符转换过滤
const escape = html => {
  return String(html)
    .replace(/&(?!\w+)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
exports.escape = escape