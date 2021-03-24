// 有进度的 promise
// Promise 的参数是一个函数，函数参数是 resolve 和 reject 两个函数
// NotifyPromise 的参数也是一个函数，函数参数是 resolve  reject notify 三个函数
class NotifyPromise extends Promise {
  constructor(fn) {
    const self = super((resolve, reject) => {
      fn(resolve, reject, (param) => {
        self.notifyFn.map(d => d(param))
      })
    })
    this.notifyFn = [];
  }
  notify(fn) {
    this.notifyFn.push(fn);
    return this;
  }
}

new NotifyPromise((resolve, reject, notify) => {
  let i = 0;
  const id = setInterval(() => {
    i++;
    notify(i * 10 + "%");
    if (i === 10) {
      clearInterval(id);
    }
  }, 200)
  setTimeout(resolve, 2000);
}).notify((progress) => {
  console.log(`notify: ${progress}`)
}).notify((progress) => {
  console.log(`notify2: ${progress}`)
}).then(() => {
  console.log("resolve")
})