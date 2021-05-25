const { deepCopy, deepCopy2 } = require("./index.js");

const copy = deepCopy;

test("普通复制", () => {
  const obj = { a: 1, b: 2, c: 3, d: null };
  const tar = copy(obj);
  expect(tar === obj).toBe(false);
  expect(JSON.stringify(tar) === JSON.stringify(obj)).toBe(true);
  expect(tar.d === null).toBe(true);
})

test("循环引用", () => {
  const obj = {};
  obj.self = obj;
  const tar = copy(obj);
  expect(tar === obj).toBe(false);
  expect(tar.self.self.self === tar).toBe(true);
})

test("引用丢失", () => {
  const b = {};
  const obj = { a: b, c: b };
  const tar = copy(obj);
  expect(tar === obj).toBe(false);
  expect(tar.a === tar.c).toBe(true);
})

test("复杂对象+数组", () => {
  const obj = {
    name: "zk",
    book: {
      title: "You Don't Know JS",
      price: "45"
    },
    a1: undefined,
    a2: null,
    a3: 123,
    arr: [null, undefined, {name: "zk", age: 15, children: ["maomao", "juzi", "douzi"]}]
  }
  const tar = copy(obj);
  expect(tar === obj).toBe(false);
  expect(tar.arr === obj.arr).toBe(false);
  obj.arr.push("haha");
  obj.arr[2].children.push("xiaohei");
  expect(JSON.stringify(tar.arr) === JSON.stringify([null, undefined, {name: "zk", age: 15, children: ["maomao", "juzi", "douzi"]}])).toBe(true);
  expect(JSON.stringify(obj.arr) === JSON.stringify([null, undefined, {name: "zk", age: 15, children: ["maomao", "juzi", "douzi", "xiaohei"]}, "haha"])).toBe(true);
  expect(tar.a1 === undefined).toBe(true);
  obj.book.price = "55";
  expect(tar.book.price).toBe("45");
})
