内置模块和扩展模块都是一样的

扩展模块：通过 node-gyp 进行 config 和 build，然后编译成 .node,进行引用即可

## 遇到的问题

`node-gyp configure` 提示 python 版本不对
```
因为最新的 node-gyp 需要 python3,版本不对编译不对。修改方法：
 - 升级 python
 - 降级 node-gyp 到 3.8.0
```
