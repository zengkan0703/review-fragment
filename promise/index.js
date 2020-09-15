const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    // 2.3.1
    return reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
  }
  // if (x instanceof Promise) {
  //   // 2.3.2
  //   x.then(resolve, reject);
  //   return;
  // }
  let called = false;
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    // 2.3.3
    try {
      const then = x.then;
      if (typeof then === "function") {
        // 2.3.3.3
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          }, 
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        )
      } else {
        // 2.3.3.4
        resolve(x);
      }
    } catch(err) {
      // 2.3.3.2
      if (called) return;
      called = true;
      reject(err)
    }
  } else {
    resolve(x);
  }
}
class Promise{
  constructor(executor) {
    this.state = PENDING;
    this.result = null;
    this.onFulfilledArr = [];
    this.onRejectedArr = [];
    const resolve = res => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.result = res;
        this.onFulfilledArr.forEach(fn => fn());
      }
    }
    const reject = err => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.result = err;
        this.onRejectedArr.forEach(fn => fn());
      }
    }

    try {
      executor(resolve, reject);
    } catch(err) {
      reject(err);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    //因为错误的值要让后面访问到，所以这里也要跑出个错误，不然会在之后 then 的 resolve 中捕获
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
          setTimeout(() => {
            // 2.2.2
            try {
              const x = onFulfilled(this.result);
              resolvePromise(promise2, x, resolve, reject);
            } catch(err) {
              reject(err)
            }
          }, 0)
      }
      if (this.state === REJECTED) {
          setTimeout(() => {
            // 2.2.3
            try {
              const x = onRejected(this.result);
              resolvePromise(promise2, x, resolve, reject);
            } catch(err) {
              reject(err)
            }
          }, 0)
      }
      if (this.state === PENDING) {
        this.onFulfilledArr.push(() => {
            setTimeout(() => {
              // 2.2.2
              try {
                const x = onFulfilled(this.result);
                resolvePromise(promise2, x, resolve, reject);
              } catch(err) {
                reject(err)
              }
            }, 0)
        });
        this.onRejectedArr.push(() => {
            setTimeout(() => {
              // 2.2.3
              try {
                const x = onRejected(this.result);
                resolvePromise(promise2, x, resolve, reject);
              } catch(err) {
                reject(err)
              }
            }, 0)
        })
      }
    })
    return promise2;
  }
  // then(onFulfilled, onRejected) {
  //   const newPromise = new Promise((resolve, reject) => {
  //     if (this.state === FULFILLED) {
  //       if (typeof onFulfilled === "function") {
  //         setTimeout(() => {
  //           try {
  //             // 2.2.7.1
  //             const x = onFulfilled(this.result);
  //             resolvePromise(newPromise, x, resolve, reject);
  //           } catch(err) {
  //             // 2.2.7.2
  //             reject(err)
  //           }
  //         }, 0)
  //       } else {
  //         // 2.2.7.3
  //         resolve(this.result);
  //       }
  //     }
  //     if (this.state === REJECTED) {
  //       if (typeof onRejected === "function") {
  //         setTimeout(() => {
  //           try {
  //             // 2.2.7.1
  //             const x = onRejected(this.result);
  //             resolvePromise(newPromise, x, resolve, reject);
  //           } catch(err) {
  //             // 2.2.7.2
  //             reject(err)
  //           }
  //         }, 0)
  //       } else {
  //         // 2.2.7.4
  //         reject(this.result)
  //       }
  //     }
  //     if (this.state === PENDING) {
  //       this.onFulfilledArr.push(() => {
  //         if (typeof onFulfilled === "function") {
  //           // 2.2.7.1
  //           const x = onFulfilled(this.result);
  //           resolvePromise(newPromise, x, resolve, reject);
  //         }
  //       });
  //       this.onRejectedArr.push(() => {
  //         if (typeof onRejected === "function") {
  //           // 2.2.7.1
  //           const x = onRejected(this.result);
  //           resolvePromise(newPromise, x, resolve, reject);
  //         }
  //       });
  //     }
  //   })
  //   return newPromise
  // }
}


module.exports = Promise


// const timer = new Promise((resolve, reject) => {
//   resolve(10)
// })
// timer.then(res => {
//   console.log(1)
//   return res
// })
// console.log(2)