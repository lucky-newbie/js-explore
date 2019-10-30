/**
 * apply 方法实现, 与call方法类似
 */
// 基于es5方式实现
Function.prototype.apply2 = function (obj, array) {
  var context = obj || window;
  context.fn = this; // 假设context对象上没有fn属性
  let result;
  if (!array) {
     result = context.fn()
  } else {
    const args = [];
    for (let i = 0, l = array.length; i < l; i++) {
     args.push(`array[${i}]`);
    }
    result = eval(`context.fn($args)`) // args会默认调用Array.toString方法
  }
  delete context.fn;
  return result;
}


// 基于ES6方式实现apply方法, apply(obj, [param1,param2])
Function.prototype.apply3 = function (context) {
 // eES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
 // 所以没有在参数上默认赋值，如 context=window, 当contxt=null时，并不会将contxt赋值给window
 context = context || window
  context.fn = this;
  let result;
  if (arguments[1]) { // 判断是否有第二个参数
   result = context.fn(...arguments[1])
  } else {
    context.fn();
  }
  delete context.fn;
  return result;
}