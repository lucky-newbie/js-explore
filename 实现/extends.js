/**
 * ex6中extends实现
 * Object.setPrototypeOf(obj, b) =  obj.prototype.__proto__ = b.prototype
 * extends 的继承通过两种方式完成了三类值的继承
    构造函数设置的属性通过复制完成继承
    实例方法通过实例原型之间的原型链完成继承
    构造函数的静态方法通过构造函数之间的原型链完成继承
 */

/*******方式一************* */
// 实现继承，通过继承父类 prototype
function __extends(child, parent) {
  // 修改对象原型
  Object.setPrototypeOf(child, parent);
  // 寄生继承，创建一个干净的构造函数，用于继承父类的 prototype
  // 这样做的好处是，修改子类的 prototype 不会影响父类的 prototype
  function __() {
    // 修正 constructor 指向子类
    this.constructor = child;
  }
  // 原型继承，继承父类原型属性，但是无法向父类构造函数传参
  // child.prototype =
  //   parent === null
  //     ? Object.create(parent)
  //     : ((__.prototype = parent.prototype), new __());
  if (parent === null) {
    child.prototype =  Object.create(parent)
  } else {
    __.prototype = parent.prototype;
    child.prototype = new __();
  }
}

var B = (function() {
  function B(opt) {
    this.name = opt.name;
  }
  return B;
})();

var A = (function(_super) {
  __extends(A, _super);
  function A() {
    // 借用继承，可以实现向父类传参, 使用 super 可以向父类传参
    return (_super !== null && _super.apply(this, { name: 'B' })) || this;
  }
  return A;
})(B);






/***** 方式二  ********* */
function B(name){
  this.name = name;
};
function A(name,age){
  //1.将A的原型指向B
  _extends(A,B);
  //2.用A的实例作为this调用B,得到继承B之后的实例，这一步相当于调用super
  Object.getPrototypeOf(A).call(this, name)
  //3.将A原有的属性添加到新实例上
  this.age = age; 
  //4.返回新实例对象
  return this;
};
function _extends(A,B){
  //  A.prototype.__proto__= B.prototype;
   A.prototype.constructor = A;
   Object.setPrototypeOf(A,B);
};
var a = new A('wxp',18);
console.log(a); // {name:'wxp',age:18}