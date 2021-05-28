// 实现 flat 打平数组
// 递归
function flat(arr, n) {
  if (n < 1) {
    return arr;
  }
  const res = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      res.push(...flat(item, n-1));
    } else {
      res.push(item);
    }
  }
  return res;
}
// 迭代
function flat2(arr, n) {
  if (n < 1) {
    return arr;
  }
  let res = [...arr];
  while (n > 0) {
    const temp = [];
    let flag = false;
    for (let item of res) {
      if (Array.isArray(item)) {
        temp.push(...item);
        flag = true;
      } else {
        temp.push(item);
      }
    }
    res = temp;
    n--;
    if (!flag) {
      break;
    }
  }
  return res;
}

// 简单版迭代
function flat3(arr, n) {
  if (n < 1) {
    return arr;
  }
  let res = [...arr];
  while (n > 0) {
    if (res.some(item => Array.isArray(item))) {
      res = [].concat(...res);
    } else {
      return res;
    }
    n--;
  }
  return res;
}

// generator 版本
function* flat4(arr, n) {
  for (let item of arr) {
    if (Array.isArray(item) && n > 0) {
      yield* flat4(item, n-1);
    } else {
      yield item
    }
  }
}

function test(arr, n) {
  const res = [];
  for (let item of flat4(arr, n)) {
    res.push(item);
  }
  return res;
}

// [...flat4(arr, n)]