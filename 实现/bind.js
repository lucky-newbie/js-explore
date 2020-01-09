// bind实现
/**
 * 采用柯里化原理实现
 */

 Function.prototype.myBind = function(thisArg) {
   // 得到参数
   const args = [].slice.call(arguments, 1);
   // 保存this
   const self = this;
   // 构建一个干净的函数，用于保存函数的原型
   const nop = function() {};
   // 绑定的函数
   const bound = function() {
     return self.apply( this instanceof nop ? this : this.Arg, args.concat([].slice.call(arguments)))
   }
   // 箭头函数没有prototype， 箭头函数this永远指向它所在的作用域
   if (this.prototype) {
      nop.prtotype = this.prototype;
   }
   bound.prototype = new nop();
   return bound;
 }


 // 柯里化面试题:
 add(1)(2)(3) = 6;
 add(1, 2, 3)(4) = 10;
 add(1)(2)(3)(4)(5) = 15;
 
 function add() {
     // 第一次执行时，定义一个数组专门用来存储所有的参数
     var _args = Array.prototype.slice.call(arguments);
     console.log('_args', _args)
     // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
     var _adder = function() {
         _args.push(...arguments);
         return _adder;
     };
 
     // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
     _adder.toString = function () {
         return _args.reduce(function (a, b) {
             return a + b;
         });
     }
     return _adder;
 }
 
 add(1)(2)(3)                // 6
 add(1, 2, 3)(4)             // 10
 add(1)(2)(3)(4)(5)          // 15
 add(2, 6)(1)                // 9
 