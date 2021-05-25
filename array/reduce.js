// 模拟 reduce
// 注意 1. 不传默认值的情况 2.稀疏数组的处理
Array.prototype.myReduce = function(fn, initVal) {
  const arr = this;
  let prev = initVal === undefined ? arr[0] : initVal;
  for (let i = initVal === undefined ? 1 : 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty(i)) {
      continue;
    }
    prev = fn(prev, arr[i], i, arr);
  }
  return prev;
}
