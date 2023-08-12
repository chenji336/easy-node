# 深入浅出学习 nodejs 的心得和代码记录

[深入浅出 nodejs-飞书](https://crmwwgawog.feishu.cn/docx/KuB7dIM3toCVdKxYtLYcBPBmnNh)

## 第六章 理解 Buffer

### 性能查看

[ab 安装和使用](https://cloud.tencent.com/developer/article/1684842)

查看命令: `ab -c 200 -t 100 http://127.0.0.1:8001/`

不同 `Time Per rquest` 区别：https://www.imooc.com/article/19952

#### 传递字符串

结果：
```
  Concurrency Level:      200
  Time taken for tests:   100.623 seconds
  Complete requests:      18776
  Failed requests:        0
  Total transferred:      193928069 bytes
  HTML transferred:       192517994 bytes
  Requests per second:    186.60 [#/sec] (mean)
  Time per request:       1071.820 [ms] (mean) // 平均值
  Time per request:       5.359 [ms] (mean, across all concurrent requests) // 并行最大时间/数量
  Transfer rate:          1882.11 [Kbytes/sec] received
```



#### 传递 buffer

```
Concurrency Level:      200
Time taken for tests:   100.774 seconds
Complete requests:      23981
Failed requests:        0
Total transferred:      247563946 bytes
HTML transferred:       245763871 bytes
Requests per second:    237.97 [#/sec] (mean)
Time per request:       840.453 [ms] (mean)
Time per request:       4.202 [ms] (mean, across all concurrent requests)
Transfer rate:          2399.04 [Kbytes/sec] received
```

## 其他

git 连接代理：`git config --global http.proxy http://127.0.0.1:11235`
取消代理：`git config --global --unset http.proxy`