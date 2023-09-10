# 句柄发送

目的：监听一个端口，执行多个 worker

问题：监听同一个端口会报错：EADDRINUSE

## 第一阶段-代理

通过代理，可以让 master 监听一个 port，然后 worker 监听不同 port，通过代理让 master 接收到的信息传递给 worker

缺点：浪费 文件描述符，每次链接到 socket 都要两个

## 第二阶段-传递句柄

tcp 举例：把 server 直接传递给 worker

本质：传递的不是 server 对象，而是 server 的信息。在 worker 中根据信息重新 new server

## 第三阶段-传递句柄&关闭 master server