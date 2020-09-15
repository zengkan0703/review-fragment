### 基础版 Promise 要点
- promise 有 3 种状态：pending、fulfilled 或 rejected。状态改变只能是 pending->fulfilled 或者 pending->rejected，状态一旦改变则不能再变
- then 中的 onFulfilled、onRejected 函数必须是异步执行的
- then 方法可多次调用
- then 方法返回一个新的 promise，可以链式调用
- then 中的 onFulfilled 和 onRejected 参数如果不是函数，则会发生值穿透，也就是值会一直在后面的 promise 中传递