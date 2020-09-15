

// 生成固定深度和广度的对象
function createObj(depth, breadth) {
  const res = {};
  let temp = res;
  for (let i = 0; i < depth; i ++) {
    temp = temp.data = {};
  }
  for (let j = 0; j < breadth; j ++) {
    temp[j] = j;
  }
  return res;
}

function isObj(param) {
  return Object.prototype.toString.call(param) === "[object Object]";
}

function deepCopy(obj, objMap = new WeakMap()) {
  if (!isObj(obj)) {
    return obj;
  }
  // 解决循环引用
  if (objMap.has(obj)) {
    return objMap.get(obj);
  }
  const target = {};
  objMap.set(obj, target)
  for (let key of Object.keys(obj)) {
    const val = obj[key];
    if (isObj(val)) {
      target[key] = deepCopy(val, objMap);
    } else {
      target[key] = val;
    }
  }
  return target;
}

// 循环代替递归, 避免爆栈
function deepCopy2(obj) {
  if (!isObj(obj)) {
    return;
  }
  const objMap = new Map();
  const root = {
    temp: null
  };
  const stack = [
    {
      parent: root,
      key: "temp",
      data: obj
    }
  ];
  while(stack.length) {
    const current = stack.pop();
    const { parent, key, data } = current;
    if (objMap.has(data)) {
      // 说明这个对象之前出现过，直接获取原来的引用
      parent[key] = objMap.get(data);
      continue;
    }
    let res = parent[key] = {};
    // 保存当前 data 在拷贝之后对象的引用 res
    objMap.set(data, res)
    for (let key2 of Object.keys(data)) {
      const val = data[key2];
      if (isObj(val)) {
        stack.push({
          parent: res,
          key: key2,
          data: val
        })
      } else {
        res[key2] = val;
      }
    }
  }
  return root.temp;
}



