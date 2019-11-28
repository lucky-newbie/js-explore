## 实现虚拟DOM
 element.js

## diff算法简化实现
  diff.js

# DOM-diff过程
* 用JS对象模拟DOM（虚拟DOM）
* 把此虚拟DOM转成真实DOM并插入页面中（render）
* 如果有事件发生修改了虚拟DOM，比较两棵虚拟DOM树的差异，得到差异对象（diff）
* 把差异对象应用到真正的DOM树上（patch）

## 什么是JSX
  jsx是一种语法糖， react使用jsx来代替常规的js
## 为什么使用jsx
  * 使用jsx编写模版简单快速，开发效率高
  * jsx编译为js后进行了优化，执行更快
  * 类型安全：在编译过程中可以发现错误
## 原理
  babel-loader会预编译jsx为React.createElement()
## 与vue的异同
  * react中虚拟dom+jsx的设计一开始就有，vue则是演进过程中出现的
  * jsx是js的扩展，转译过程简单直接， vue把template转译为render函数的过程需要复杂的编译器转换字符串-ast-js函数