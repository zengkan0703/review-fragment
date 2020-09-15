function isObj(param) {
  return typeof param === "object" && param !== null;
}

function deepCopy(obj, objMap = new WeakMap()) {
  if (!isObj(obj)) {
    return obj;
  }
  // 解决循环引用
  if (objMap.has(obj)) {
    return objMap.get(obj);
  }
  const target = Array.isArray(obj) ? [] : {};
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
  const objMap = new WeakMap();
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
    let res = parent[key] = Array.isArray(data) ? [] : {};
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

module.exports = {
  deepCopy,
  deepCopy2
}