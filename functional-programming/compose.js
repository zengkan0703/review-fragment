// 实现 compose 函数，支持 compose(fn)(fn1, fn2)(fn3)(fn4, 1)调用

function compose(...params) {
  const fns = [];
  for (let param of params) {
    if (typeof param === "function") {
      fns.push(param);
    } else {
      break;
    }
  }
  let args = params.slice(fns.length);
  if (args.length) {
    while (fns.length) {
      const current = fns.pop();
      args = [current(...args)];
    }
    return args[0];
  }
  return function (...other) {
    return compose(...params, ...other);
  }
}