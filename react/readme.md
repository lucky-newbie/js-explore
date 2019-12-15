# react + react-router + redux 搭建测试

* react 生命周期验证
* react hooks验证
* webpack编写
* 搜索框/弹窗封装组件
* ant design使用
* 


# 什么是jsx， 为什么使用
  jsx是一个语法糖，通过用js的方式写页面
  优点：使用jsx方式写展现更加直观，可以很好的描述UI，提高开发效率； jsx防止攻击（XSS）
  * jsx中可以是哪些值？
    js合法表达式即可
# 什么是纯函数？
  “纯函数”，不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。
# react fiber


# 什么是Babel
  Babel 是一个 JS 编译器, 主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。
  * babel可以做什么？
    1. 语法转换
    2. 通过 Polyfill 方式在目标环境中添加缺失的特性(@babel/polyfill模块)
    3. 
* Babel插件：
    1. 插件在 Presets 前运行。
    2. 插件顺序从前往后排列。
    3. Preset 顺序是颠倒的（从后往前）。

  Babel 的插件分为两种: 
  1. 语法插件： 这些插件只允许 Babel 解析（parse） 特定类型的语法（不是转换），可以在 AST 转换时使用，以支持解析新语法
  2. 转换插件：插件会启用相应的语法插件(因此不需要同时指定这两种插件)，这点很容易理解，如果不启用相应的语法插件，意味着无法解析，连解析都不能解析，又何谈转换呢
* babel中的plugin和preset是什么？

* @babel/runtime

* @babel/polyfill
  模块包括 core-js 和一个自定义的 regenerator runtime 模块，可以模拟完整的 ES2015+ 环境（不包含第4阶段前的提议）。

  这意味着可以使用诸如 Promise 和 WeakMap 之类的新的内置组件、 Array.from 或 Object.assign 之类的静态方法、Array.prototype.includes 之类的实例方法以及生成器函数(前提是使用了 @babel/plugin-transform-regenerator 插件)。为了添加这些功能，polyfill 将添加到全局范围和类似 String 这样的内置原型中(会对全局环境造成污染，后面我们会将不污染全局环境的方法)。

* @babel/plugin-transform-runtime
  是一个可以重复使用 Babel 注入的帮助程序，以节省代码大小的插件。其次使用它还有一个好处，它可以为代码创建一个沙盒环境，如果使用 @babel/polyfill 及其提供的内置程序（例如 Promise ，Set 和 Map ），则它们将污染全局范围。虽然这对于应用程序或命令行工具可能是可以的，但是如果你的代码是要发布供他人使用的库，或者无法完全控制代码运行的环境，则将成为一个问题。

* @babel/preset-env
  主要作用是对我们所使用的并且目标浏览器中缺失的功能进行代码转换和加载 polyfill，在不进行任何配置的情况下，@babel/preset-env 所包含的插件将支持所有最新的JS特性(ES2015,ES2016等，不包含 stage 阶段)，将其转换成ES5代码。例如，如果你的代码中使用了可选链(目前，仍在 stage 阶段)，那么只配置 @babel/preset-env，转换时会抛出错误，需要另外安装相应的插件。

* 自定义babel preset 
  创建一个自己的 preset，只需导出一份配置即可。可以是一个插件数组， 也可以是其他插件带参数
  ```
    module.exports = function() {
      return {
        plugins: [
          "pluginA",
          "pluginB",
          "pluginC",
        ]
      };
    }
  ```
* 组件的形式
  1. function组件: 通常无状态，仅关注内容展示
  2. class组件： 拥有状态和生命周期，继承Component
* 修改state方式：
  this.setState({}), 不要直接修改state

* setState是批量更新的,因此对同一个状态执行多次只起一次作用，多余状态更新可以放在同一个setState中进行， 比如:
```
constructor(){
  super();
  this.state = {counter: 0}
}
componentDidMount() {
  this.setState({counter: this.counter + 1},() => console.log(this.state.counter)) // 1
  this.setState({counter: this.counter + 1},() => console.log(this.state.counter) ) // 1
  this.setState({counter: this.counter + 1},() => console.log(this.state.counter) ) // 1


  // 多次setState时，想要获得123的值，则使用如下方式
  this.setState(state => ({counter: state.counter + 1}), () => {
    console.log(this.state.counter)
  })
  this.setState(state => ({counter: state.counter + 1}), () => {
    console.log(this.state.counter)
  })
  this.setState(state => ({counter: state.counter + 1}), () => {
    console.log(this.state.counter)
  })
}
```

* setState通常是异步的， 获取setate值通常有三种方式
  1. this.setState({state, props} => {console.log(state)})
  2. 使用setTimeout:
    setTimeout(() => {console.log(this.state.data)}, 4)
  3. 原生事件中修改状态
   componentDidMount() {
     document.addEventListener('click', this.handleClick);
   }
   handleClick(e) => {
    this.setState({count: this.state.count + 1});
    console.log(this.state.count)
   }

  * 组件间通信方式
   1. 父- 子： 通过props传递
   2. 子-父： (状态提升)子组件通过调用父组件方法，进行状态提升 
   3. 采用redux
   4. 使用context(常用于组件库的开发)

  * 生命周期（16.4版本）
    1. 挂载
      constructor()： 用来初始化state或进行方法绑定
      static getDerivedStateFromProps()
      render()
      componentDidMount()
    2. 更新
      static getDerivedStateFromProps(props, state)
      shouldComponentUpdate(preProps, preState): 默认返回true，首次渲染和调用forceUpdate不会调用该方法
      render()
      getSnapshotBeforeUpdate(preProps, preState)
      componentDidUpdate(preProps, preState, snapshot)
    3. 卸载
      componentWillUnmount(): 在这里不应调用 setState()，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。
    4. 错误处理
      static getDerivedStateFromError(error)
      componentDidCatch(error, info)
  * 其他API
    1. setState: 将对组件state的更改排入队列，并通知React需要使用更新后的state重新渲染此组件及其子组件
    2. forceUpdate
  * Class属性
    defaultProps、displayName
  * 实例属性
    props、state
  * render返回类型
    1. React元素
    2. 数组或Fragments
    3. Protals
    4. 字符串或数值类型
    5. 布尔类型或null
  
  * ReactDO API
    1. render(element, container[,callback])
    2. hydrate(element, container[,callback])
      用于服务端渲染
    3. unmountComponentAtNode(container)
      从 DOM 中卸载组件，会将其事件处理器（event handlers）和 state 一并清除。如果指定容器上没有对应已挂载的组件，这个函数什么也不会做。如果组件被移除将会返回 true，如果没有组件可被移除将会返回 false。
    4. findDOMNode(ref) 严格模式下已被弃用

    5. createPortal(child, container)
      创建 portal。Portal 将提供一种将子节点渲染到 DOM 节点中的方式，该节点存在于 DOM 组件的层次结构之外。

  * error buoundle(错误边界), 以下错误情景无法被捕获
    1. 异步代码 setTimeout/requestAnimationFrame（回调函数)
    2. 事件处理
    3. 服务端渲染
    4. 它自身抛出来的错误（并非它的子组件）
    