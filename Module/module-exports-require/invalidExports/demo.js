function testFn(x) {
  x = 100
}

let x = 1
testFn(x)

/**
 * 通过 testFn 运行，x 是没有改变的
 */
console.log(
  'x:', x
)