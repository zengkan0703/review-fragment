// 模拟实现 call
Function.prototype.myCall = function(context, ...args) {
  // 非严格模式下， context 为 null 或 undefined 会替换为 window
  if (context === null || context === undefined) {
    context = window;
  }
  // 如果传入的是原始值，那么这个原始值会被包装
  context = Object(context)
  // this 表示当前函数
  context.func = this;
  const res = context.func(...args);
  delete context.func;
  return res;
}

// 不用 es6 模拟实现
Function.prototype.myCall2 = function(context) {
  // 非严格模式下， context 为 null 或 undefined 会替换为 window
  if (context === null || context === undefined) {
    context = window;
  }
  // 如果传入的是原始值，那么这个原始值会被包装
  context = Object(context)
  // this 表示当前函数
  context.func = this;
  var args = [];
  for (let i = 1; i < arguments.length; i ++) {
    args.push(arguments[i]);
  }
  var res = eval("context.func(" + args.join(",") + ")");
  delete context.func;
  return res;
}

// apply 类似，只不过函数的传参用数组
Function.prototype.myApply = function(context, arr = []) {
  // 非严格模式下， context 为 null 或 undefined 会替换为 window
  if (context === null || context === undefined) {
    context = window;
  }
  // 如果传入的是原始值，那么这个原始值会被包装
  context = Object(context)
  // this 表示当前函数
  context.func = this;
  const res = context.func(...arr);
  delete context.func;
  return res;
}