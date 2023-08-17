# 构建 Web 应用

## cookie

1、按照书上的 curl 有问题
```
解决参考：https://www.shuijingwanwq.com/2022/03/14/6124/
powerShell 调用 cookie: `curl -Headers @{"Cookie"="foo=bar;baz=val"} "http://127.0.0.1:8888/path?foo=bar&foo=baz"`
还是有问题，该 cookie 无效

解决：还是使用网页进行请求
```