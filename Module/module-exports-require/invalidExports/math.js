
/**
 * 期望：外部引用 export 是一个函数，直接运行
 * 实际：报错，提示`TypeError: all is not a function`
 * 原因：README 中有说明 exports 只是 node 函数中的一个参数，在函数内部修改参数，在外部是无用的，可看 demo.js
 */
// exports = (x, y) => {
//   return x + y;
// }

/**
 * 正确使用姿势
 */
module.exports = (x, y) => {
  return x + y;
}