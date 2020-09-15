const { deepCopy, deepCopy2 } = require("./index.js");

test("普通复制", () => {
  const obj = { a: 1, b: 2, c: 3 };
  const tar = deepCopy(obj);
  expect(tar === obj).toBe(false);
  expect(JSON.stringify(tar) === JSON.stringify(obj)).toBe(true);
})

test("复杂对象", () => {
  const obj = {
    a: 1,
    b: {
      c: {
        d: 10
      },
      e: {
        f: 5
      }
    },
    g: {
      a: 2
    }
  }
  const tar = deepCopy(obj);
  obj.b.c.d = 5;
  obj.b.e = 5;
  obj.g.a = 5;
  expect(tar === obj).toBe(false);
  expect(tar.b.c.d).toBe(10);
  expect(tar.g.a).toBe(2);
  expect(JSON.stringify(tar.b.e) === JSON.stringify({ f: 5 })).toBe(true);
})

test("循环引用", () => {
  const obj = {};
  obj.self = obj;
  const tar = deepCopy(obj);
  expect(tar === obj).toBe(false);
  expect(tar.self.self.self === tar).toBe(true);
})

test("引用丢失", () => {
  const b = {};
  const obj = { a: b, c: b };
  const tar = deepCopy(obj);
  expect(tar === obj).toBe(false);
  expect(tar.a === tar.c).toBe(true);
})




test("普通复制2", () => {
  const obj = { a: 1, b: 2, c: 3 };
  const tar = deepCopy2(obj);
  expect(tar === obj).toBe(false);
  expect(JSON.stringify(tar) === JSON.stringify(obj)).toBe(true);
})

test("复杂对象2", () => {
  const obj = {
    a: 1,
    b: {
      c: {
        d: 10
      },
      e: {
        f: 5
      }
    },
    g: {
      a: 2
    }
  }
  const tar = deepCopy2(obj);
  obj.b.c.d = 5;
  obj.b.e = 5;
  obj.g.a = 5;
  expect(tar === obj).toBe(false);
  expect(tar.b.c.d).toBe(10);
  expect(tar.g.a).toBe(2);
  expect(JSON.stringify(tar.b.e) === JSON.stringify({ f: 5 })).toBe(true);
})

test("循环引用2", () => {
  const obj = {};
  obj.self = obj;
  const tar = deepCopy2(obj);
  expect(tar === obj).toBe(false);
  expect(tar.self.self.self === tar).toBe(true);
})

test("引用丢失2", () => {
  const b = {};
  const obj = { a: b, c: b };
  const tar = deepCopy2(obj);
  expect(tar === obj).toBe(false);
  expect(tar.a === tar.c).toBe(true);
})