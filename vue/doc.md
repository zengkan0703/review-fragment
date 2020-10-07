## 数据驱动
Vue 的一个核心思想是数据驱动

### Vue 加载时执行的代码

1. core/instance/index

   1. 初始化构造函数 Vue
   2. 执行 initMixin 方法
      1. 在 Vue 原型上挂载 _init 方法
   3. 执行 stateMixin 方法
      1. 在 Vue 原型上设置 $data 属性，并设置 getter 和 setter
         1. getter:  return this._data
         2. setter: 只有在开发环境会设置，显示一个警告提示
      2. 在 Vue 原型上设置 $props 属性，并设置 getter 和 setter
         1. getter: return this._props
         2. setter: 只有在开发环境会设置，显示 readonly 警告提示
      3. 在 Vue 原型上设置 $set 方法
      4. 在 Vue 原型上设置 $delete 方法
      5. 在 Vue 原型上设置 $watch 方法
   4. 执行 eventsMixin 方法
      1. 在 Vue 原型上设置 $on 方法
      2. 在 Vue 原型上设置 $once 方法
      3. 在 Vue 原型上设置 $off 方法
      4. 在 Vue 原型上设置 $emit 方法
   5. 执行 lifecycleMixin 方法
      1. 在 Vue 原型上设置 _update 方法
      2. 在 Vue 原型上设置 $forceUpdate 方法
      3. 在 Vue 原型上设置 $destory 方法
   6. 执行 renderMixin 方法
      1. 在 Vue 原型上设置一些 render 相关的工具方法
      2. 在 Vue 原型上设置 $nextTick 方法
      3. 在 Vue 原型上设置 _render 方法

2. core/index

   1. initGlobalAPI

      1. 在 Vue 构造函数上初始化一些方法和属性
         1. Vue.util
         2. Vue.config，且通过 setter 提示不可改变
         3. Vue.set Vue.delete Vue.nextTick
         4. Vue.options = Object.create(null)，Vue.config 初始化为一个空对象。
            1. 随后设置 Vue.options.components、Vue.options.directives、Vue.options.filters 为一个空对象
            2. 在 Vue.options.components 上扩展 builtInComponents，也就是 KeepAlive 组件
      2. initUse，在 Vue 上挂载 Vue.use 方法，用来安装插件

      3. initMixin，在 Vue 上挂载 mixin 方法，用来设置全局 mixin

      4. initExtend，挂载 Vue.extend 方法，用来创造 Vue 的子类

      5. initAssetRegisters

         1. 挂载 Vue.component 方法，用来注册或获取全局组件，放在 Vue.options.components 中
         2. 挂载 Vue.directive 方法，用来注册或获取全局指令，放在 Vue.options.directives 中
         3. 挂载 Vue.filter 方法，用来注册或获取全局过滤器，放在 Vue.options.filters 中

   2. 在 Vue 原型上挂载 $isServer 和 $ssrContext 属性

   3. 在 Vue 上挂载静态方法 FunctionalRenderContext

   4. 在 Vue 上挂载静态属性 version，值为 '\_\_VERSION\_\_'，后续会在 rollup 执行时被替代为 vue 的版本号

3. platforms/web/runtime/index

   1. 在 Vue.config 上挂载一些静态方法，和 web 元素相关的
   2. 在 Vue.options.directives 上扩展 web 平台通用的指令，model 和 show
   3. 在 Vue.options.components 上扩展 web 平台通用的组件，Transition 和 TransitionGroup
   4. 在 Vue 原型上挂载 \_\_patch\_\_ 方法
   5. 在 Vue 原型上挂载 $mount 方法
   6. 判断如果是浏览器运行环境且打开了 devtools，执行 devtools 的初始化

4. entry-runtime-with-compiler（带编译器的版本入口文件）

   1. 重写 Vue.prototype.$mount 方法，如果 option 中没有 render 方法，根据 option 中的 template 和 el 字段生成 render 方法。
   2. 在 Vue 上挂载静态方法 compile



### Vue 初始化的过程

也就是 new Vue 的流程

1. Vue 构造函数
2. 调用 _init(options)，这是在 initMixin 给 Vue 原型对象定义的方法
   - 用户提供的 options 与默认 options 合并
   - initLifecycle，初始化生命周期相关的变量
     - 设置 vm.$parent、vm.$root
     - 初始化 vm.$children vm.$refs
     - 初始化一些标记
   - initEvents
   - initRender，初始化 render 相关
     - 挂载 vm.$createElement 方法
   - callHook(vm, 'beforeCreate')，触发 beforeCreate 钩子
   - initInjections，初始化 inject 相关
   - initState
     - initProps
     - initMethods
     - initData，Data 中的数据代理到 vm 上，并对 data 进行响应式处理
     - initComputed
     - initWatch
   - initProvide，初始化 provide
   - callHook(vm, 'created')，触发 created 钩子，所以在 created 生命周期中可以访问 this 上的方法和属性
   - vm.$mount($el)，执行挂载

#### mount 流程

vm.$options.el 存在 ==> 执行 entry-runtime-with-compiler.js $mount
不存在的话，必须要手动执行 $mount

entry-runtime-with-compiler.js 的 $mount ：

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

runtime/index 中的 $mount：执行 core/instance/lifecycle 中的 mountComponent 方法

- 赋值 vm.$el = el
- 触发 beforeMount 钩子
- 创建组件更新函数 updateComponent
- 新建 watcher 传入 updateComponent 方法
- 判断如果是根节点，执行 mounted 钩子

### 响应式
##### Observer 
Observer 类会附加在每一个被侦测的 object 上，会通过 defineReactive 方法把 object 的所有属性转换为 getter/setter 的形式，来收集属性的依赖，并且当属性发生变化时通知这些依赖
##### Watcher
Watcher 相当于一个中介，数据发生变化时通知 watcher，然后 watcher 再执行具体的回调函数（watch、compuetd、render 等等）
##### Dep
Dep 用来管理每一个属性的依赖，这个依赖就是 watcher 实例。
- 对象中的每个 key 的 dep 实例保存在 defineReactive 的闭包中，在 getter 中用 dep.depend 收集依赖，在 setter 中用 dep.notify() 方法通知更新，分别执行该 dep 中保存的 watcher 对应的 update 方法
- 数组的 dep 实例保存在该数组的 Obserever 实例中，也就是 \_\_ob\_\_ 属性中。在该数组对应的 key 的 getter 中收集依赖，也就是源码中对应的 childOb.dep.depend() 方法。比如 data: { a: [1,2] }，a 数组的依赖会在 data.a 的 getter 中收集，这里面的 childOb 就是数组 a 对应的 \_\_ob\_\_。然后在修改数组的方法中执行 dep.notify()

