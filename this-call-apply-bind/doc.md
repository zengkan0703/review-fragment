### call & apply
模拟实现 call 和 apply 的要点
- 函数的 this 指向调用该函数的对象
- call 和 apply 给原函数的传参方式不同
- 非严格模式下， context 为 null 或 undefined 会替换为 window
- 如果传入 context 的是原始值（数值、布尔、字符串等），那么这个原始值会被包装

### bind
模拟实现 bind 的要点
- bind 返回一个新的函数
- bind 传递的剩余参数会作为原函数的前置参数
- bind 返回的函数还可以通过 new 运算符调用，此时传入的 this 会失效，但是前值参数仍然生效

bind 常见的用处
- 绑定 this
- 生成偏函数