// 实现一个 Generator 函数的自动执行器

// 简单版实现
function generatorExecutor(generatorFn) {
  const iterator = generatorFn();
  return new Promise((resolve, reject) => {
    function step(key, val) {
      let result;
      try {
        result = iterator[key](val)
      } catch(err) {
        reject(err);
      }
      if (result.done) {
        resolve(result.value);
      } else {
        Promise.resolve(result.value).then(res => {
          step("next", res)
        }).catch(err => {
          step("throw", err)
        })
      }
    }
    step("next");
  })
}

// 类似 co 库的实现
function generatorExecutor(generatorFn) {
  const gen = generatorFn();
  return new Promise((resolve, reject) => {
    function onFulfilled(param) {
      let res;
      try {
        res = gen.next(param);
      } catch(err) {
        reject(err);
      }
      step(res);
    }
    function onRejected(err) {
      let res;
      try {
        res = gen.throw(err);
      } catch(e) {
        reject(e)
      }
      step(res);
    }
    function step(param) {
      if (param.done) {
        resolve(param.value);
      } else {
        Promise.resolve(param.value).then(onFulfilled, onRejected)
      }
    }
    onFulfilled();
  })
}