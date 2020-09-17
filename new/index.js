function myNew(constructor, ...args) {
  // 创建一个原型对象为 constructor.prototype 的对象
  const obj = Object.create(constructor.prototype);
  // 把构造函数的 this 指向这个对象
  const res = constructor.call(obj, ...args);
  // 如果构造函数返回一个对象就直接返回这个对象，否则返回原对象
  return typeof res === "object" && res !== null ? res : obj;
}
