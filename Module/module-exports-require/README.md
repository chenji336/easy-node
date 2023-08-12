# module、exports、require、__dirname 和 __filename 从哪里来

> node 做的包装

当引用 js 的时候，node 会在头尾进行包装，代码如下

```js
(function(exports, require, module, __filename, __dirname) {
  // js 的具体内容
})
```