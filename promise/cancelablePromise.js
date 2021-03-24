// Promise 的参数是一个函数，函数参数是 resolve 和 reject 两个函数
// CancelablePromise 的参数也是一个函数，函数参数是 resolve  reject 两个函数
class CancelablePromise extends Promise {
  constructor(fn) {
    super((resolve, reject) => {
      fn(
        (...param) => {
          if (!this.canceled) {
            resolve(...param)
          }
        },
        (...param) => {
          if (!this.canceled) {
            reject(...param)
          }
        }
      )
    })
    this.canceled = false;
  }
  cancel() {
    console.log("取消")
    this.canceled = true;
  }
}

const time = new CancelablePromise(resolve => {
  setTimeout(resolve, 2000)
})

time.then(() => {
  console.log("resolve")
})

setTimeout(() => {
  time.cancel();
}, 2100)