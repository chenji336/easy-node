/**
 * 制作简单模板
 * <%=username%> => obj.username
 */

const { escape } = require('./xss')
/** 标记为执行表达式 */
const segToken = Date.now() + Math.random()

const compile = (str) => {
  let tpl = str.replace(/<%=([\s\S]+?)%>/g, (match, code) => {
    // console.log(match, code)
    return `' + escape(${code}) + '`
  }).replace(/<%([\s\S]+?)%>/g, (match, code) => {
    return `\n${code}${segToken}\n`
  })

  tpl = tpl.split(/\n/g)
    // .filter(item => !item.includes(segToken) && item.trim() !== '')
    .map(item => {
      if (item.includes(segToken) || item.trim() === '') {
        return item.replace(segToken, '')
      }
      return `res += '${item}'`
    })
    .filter(item => item.trim() !== '')
    .join('\n')

  tpl = `let res = '';\nwith(obj) {${tpl}}\nreturn res`
  console.log('tpl:', tpl)
  return new Function('obj', 'escape', tpl)
}

// render 为什么拆分成 compile，而不是写在一起？
// 缓存。执行后生成 compiled，不需要每次都生成 compiled
const render = (compiled, data) => {
  const res = compiled(data, escape)
  console.log('res:', res)
  return res
}

// render(
//   compile('Hello <%=username%>'),
//   {
//     username: 'chenji <script>' // 执行 escape
//   }
// ) // => Hello chenji &lt;script&gt;

// 问题，不能映射普通字符
// 可以通过 witch 解决
// render(
//   compile('Hello <%="username"%> end'),
//   {
//     username: 'chenji'
//   }
// ) // => Hello chenji

// 运行 if else 语句
// render
// (
//   compile(`
//       <% if (obj.user) { %>
//         <h2><%= user.name %></h2>
//       <% } else { %>
//         <h2>匿名用户</h2>
//       <% } %>
//     `
//   ),
//   {
//     user: {
//       name: 'chenji'
//     }
//   }
// )

// 运行 for 语句
render(
  compile(`
    <% for(let i = 0; i < items.length; i++) { %>
      <% let item = items[i] %>
      <p><%= i+1 %>、<%= item.name%></p>
      <% } %>
  `),
  {
    items: [
      {name: 'chenji'},
      {name: 'minxi'}
    ]
  }
)
