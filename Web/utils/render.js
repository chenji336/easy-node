/**
 * 制作简单模板
 * <%=username%> => obj.username
 */

const compile = (str) => {
  let tpl = str.replace(/<%=(\w+)%>/g, (match, code) => {
    // console.log(match, code)
    return `' + obj.${code}`
  })
  tpl = `return '${tpl}`
  console.log('tpl:', tpl)
 return new Function('obj', tpl)
}

// render 为什么拆分成 compile，而不是写在一起？
// 缓存。执行后生成 compiled，不需要每次都生成 compiled
const render = (compiled, data) => {
  const res = compiled(data)
  console.log('res:', res)
  return res
}

render(
  compile('Hello <%=username%>'),
  {
    username: 'chenji'
  }
) // => Hello chenji