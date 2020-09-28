## 数据驱动
Vue 的一个核心思想是数据驱动

### vue 实例挂载的过程
#### 带 compiler 的代码
1. 获取挂载的 el，如果 el 是 body 或者 html 元素，中断
2. 如果没有设置 render 方法
   - 如果指定了 template
      - 如果 template 是字符串
         - 如果 template 以 # 开头，则把该字符串当成 id 选择器，取该元素的 innerHTML 作为 template
         - 如果不是以 # 开头，那么不做额外处理，还是用 template 自身的字符串作为模板
      - 如果 template 是一个节点，则获取该节点的 innerHTML 作为 template
      - 否则，template 参数不合法，中断
   - 如果没有指定 template 且存在 el 参数，获取 el 的 outerHTML 作为 template
   - 用 compileToFunctions 方法根据 template 生成 render 方法
3. 执行公共的 mount 方法
   
