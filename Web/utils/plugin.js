/**
 * 编写中间件
 */

const stack = {};

const fn1 = (req, res, next) => {
  console.log('fn1');
  next();
};

const fn2 = (req, res, next) => {
  console.log('fn2');
  next();
};

const fn3 = (req, res, next) => {
  console.log('fn3');
  next();
};

use(fn1);
use(fn2);
use('/test', fn3);

function use(path, fn) {
  if (typeof path !== 'string') {
    fn = path;
    path = '/';
  }

  // 正式中，是通过 routes 记录 path 和 stack
  // 后续匹配到 path 之后，则运行相应 stack
  // 这里简单处理，直接 stack 保存路径即可
  stack[path] = stack[path] || [];
  stack[path].push(fn);
}

const start = (pathname, req, res) => {
  const currentStack = [];
  Object.keys(stack).forEach((key) => {
    if (!pathname.includes(key)) {
      return;
    }
    currentStack.push(...stack[key]);
  });

  console.log(currentStack);
  const next = () => {
    const middleware = currentStack.shift();
    if (!middleware) {
      return;
    }
    middleware(req, res, next);
  };
  next();
};

start('/test/chenji');
