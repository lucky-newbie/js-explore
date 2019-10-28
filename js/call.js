/**
 * call 方法实现
 */

Function.prototype.call2 = function (obj) {
  const context = obj || window;
  context.fn = this;
  const args = [];
  // 由于通过arguments对象上获取参数，call方法第一个为指向对象，第二个开始才是参数，所以循环从1开始
  for (let i = 1; i< arguments.length; i++) {
    args.push(`arguments[${i}]`);
  }
  console.log(`context.fn(${args})`,1);
  console.log(context.fn, 2)
  const result = eval(`context.fn(${args})`);
  delete context.fn;
  return result;
}

//es6方式
Function.prototype.call2 = function (context) {
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1); // 得到参数
  const res = context.fn(args);
  delete context.fn;
  return res;
}