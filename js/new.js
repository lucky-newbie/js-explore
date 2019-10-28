/**
 * new实现
 * 创建一个空的简单JavaScript对象（即{}）；
   链接该对象（即设置该对象的构造函数）到另一个对象 ；
   将步骤1新创建的对象作为this的上下文 ；
   如果该函数没有返回对象，则返回this。
 */

 function New(){
  var obj = new Object();
  // 得当当前函数的构造函数， 并且arguments对象改变，弹出第一个对象后，后面即为参数
  var Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;
  // 由于arguments对象是类数组对象，所以使用apply
  var res = Constructor.apply(obj, arguments);
  return typeof res === 'object' ? res : obj;
}
