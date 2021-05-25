/*
实现一个控制并发数的函数 fn(tasks, limit)
返回一个 promise，resolve 的值一个数组，包含所有执行结果
测试代码：

function test(id, time, err) {
  return function() {
    return new Promise((resolve, reject) => {
      console.log(`${id} 开始`)
      setTimeout(() => {
        err ? reject(new Error(id)) : resolve(id)
        console.log(`${id} 执行了`)
      }, time)
    })
  }
}
const arr = [
  test(1, 500), test(2,3000), test(3, 1000, true), test(4,1000), test(5,1000)
]
asyncLimit(arr, 2).then(res => {
  console.log(res, "执行完了")
})
*/

function asyncLimit(tasks, limit) {
  const results = new Array(tasks.length);
  let idx = 0;
  let num = 0;
  let doneNums = 0;
  return new Promise(resolve => {
    function runTask() {
      if (num < limit && idx < tasks.length) {
        const currentTask = tasks[idx]();
        const tempIdx = idx;
        Promise.resolve(currentTask).then(res => {
          results[tempIdx] = res;
        }).catch(err => {
          results[tempIdx] = err;
        }).finally(() => {
          num--;
          doneNums++;
          runTask();
          if (doneNums === tasks.length) {
            resolve(results);
          }
        })
        idx++;
        num++;
        runTask();
      }
    }
    runTask();
  })
}
