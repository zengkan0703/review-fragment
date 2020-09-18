### 纯函数
纯函数是相同的输入永远会得到相同输出，且没有任何副作用的函数。

纯函数的优点
- 可缓存性
  - 由于相同输入永远会得到相同的输出，所以可以进行缓存
- 可移植性
  - 由于纯函数没有外部依赖，所有的依赖都通过参数传递，所以移植起来很方便
- 可测试性

### 柯里化
柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。
curry(func) 调用的结果是如下所示的包装器 curried：
```js
// func 是要转换的函数
function curried(...args) {
  if (args.length >= func.length) { // (1)
    return func.apply(this, args);
  } else {
    return function pass(...args2) { // (2)
      return curried.apply(this, args.concat(args2));
    }
  }
};
```
当我们运行它时，这里有两个 if 执行分支：

- 现在调用：如果传入的 args 长度与原始函数所定义的（func.length）相同或者更长，那么只需要将调用传递给它即可。
- 获取一个偏函数：否则，func 还没有被调用。取而代之的是，返回另一个包装器 pass，它将重新应用 curried，将之前传入的参数与新的参数一起传入。然后，在一个新的调用中，再次，我们将获得一个新的偏函数（如果参数不足的话），或者最终的结果