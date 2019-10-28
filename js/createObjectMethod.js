/**
 * 创建js对象方式
 */

 /**
  * 工厂模式
  * 
  * 缺点：对象无法识别，因为所有的实例都指向一个原型
  */
 function Person(name) {
   const p = new Object()
   p.name = name;
   p.getName = function () {
     return this.name;
   }
   return p;
 }
  var p1 = Person('Tom')

/******************************************************************** */

 /**
  * 构造函数模式
  * 优点：实例可以识别为一个特定的类型
  * 缺点：每次创建实例时，每个方法都要被创建一次
  */
  function Person (name) {
    this.name = name;
    this.getName = function () {
      return this.name
    }
  }

  // 构造函数模式优化, 解决每次创建实例时，方法每次都要创建的问题
  function Person (name) {
    this.name = name;
    this.getName = getName;
  }
  function getName() {
    return this.name
  }

/******************************************************************** */

  /**
   * 原型模式
   * 优点：方法不会重新创建
   * 缺点: 1. 所有的属性和方法都共享 2. 不能初始化参数
   */
  function Person () {

  }
  Person.prototype.name = 'Tom';
  Person.prototype.getName = function () {
    console.log(this.name)
  }

/******************************************************************** */

  /**
   * 组合模式： 构造函数模式与原型模式双剑合璧。
   * 优点：该共享的共享，该私有的私有，使用最广泛的方式
   * 缺点：有的人就是希望全部都写在一起，都放到prototype上，即更好的封装性
   */
  function Person (name) {
    this.name = name;
  }

  Person.prototype = {
    constructor: Person,
    getName: function () {
      console.log(this.name);
    }
  }

/******************************************************************** */

  /**
   * 动态原型模式
   * 优点：
   * 缺点：
   */
  function Person (name) {
    this.name = name;
    if (typeof this.getName !== 'function') {
      Person.prototype.getName = function (name) {
        console.log(this.name)
      }
    }
  }

/******************************************************************** */

  /**
   * 寄生构造函数模式, 寄生构造函数模式与工厂模式写法区别在于，多了一个new操作
   * 

   */
  function Person (name) {
    var o = new Object();
    o.name = name;
    o.getName = function () {
      console.log(this.name)
    }
  }
   var p = new Person('Tom')

  /**
   * 应用场景：这样方法可以在特殊情况下使用。比如我们想创建一个具有额外方法的特殊数组，
   * 但是又不想直接修改Array构造函数，如示例
  */
  function SpecialArray() {
    var values = new Array();
    values.push.apply(values, arguments)
    values.toPipedString = function () {
        return this.join("|");
    };
    return values;
  }
  
  var colors = new SpecialArray('red', 'blue', 'green');
  var colors2 = SpecialArray('red2', 'blue2', 'green2');
  
  console.log(colors);
  console.log(colors.toPipedString()); // red|blue|green
  
  console.log(colors2);
  console.log(colors2.toPipedString()); // red2|blue2|green2

  // 寄生构造函数模式就是比工厂模式在创建对象的时候，多使用了一个new，实际上两者的结果是一样的。
  // 可能是希望能像使用普通 Array 一样使用 SpecialArray，虽然把 SpecialArray 当成函数也一样能用，但是这并不是本意，也变得不优雅。
  // 在可以使用其他模式的情况下，不要使用这种模式。

/******************************************************************** */

  /**
   * 稳妥构造函数模式， 与寄生构造函数和工厂模式相似
   * 
   * 所谓稳妥对象，指的是没有公共属性，而且其方法也不引用 this 的对象。
   * 与寄生构造函数模式有两点不同：
   * 新创建的实例方法不引用 this
   * 不使用 new 操作符调用构造函数
   * 稳妥对象最适合在一些安全的环境中。
   * 稳妥构造函数模式也跟工厂模式一样，无法识别对象所属类型。
   */

   function Person (name) {
     var o = new Object();
     o.name = name;
     o.getName = function (){
       return name;
     }
     return o;
   }