/**
 * js 继承方式
 */

 /*******原型链继承******************************************* */
 /**
  * 原型链继承
  * 存在的问题：1.引用类型的属性被所有实例共享；
    2.在创建 Child 的实例时，不能向Parent传参;
    3.Child的实例对象的构造函数指向了Parent的构造函数
  */
  function Parent () {
    this.name = []
  }

  Parent.prototype.getName = function(){
    console.log(this.name)
  }

  function Child() {

  }
  Child.prototype = new Parent();
  var child = new Child();

/********借用构造函数继承************************************ */

/**
 * 借用构造函数继承(经典继承)
 * 优点：1.避免了引用类型的属性被所有实例共享；2.可以在 Child 中向 Parent 传参
 * 缺点：1.方法都在构造函数中定义，每次创建实例都会创建一遍方法。 
 *      2.不能继承Parent原型链上的方法
 */

 function Parent (name) {
   this.name = name;
 }

 function Child (name) {
   Parent.call(this, name)
 }

 var child = new Child('Tom');
 console.log(child.name)

/**********组合继承******************************************************* */

/**
 * 组合继承（原型链继承 + 借用构造函数继承）
 * 优点：借用构造函数 和 原型链优缺点结合
 */
 function Parent(){
   this.name = [];
 }
 Parent.prototype.getName = function () {
   return this.name
 }

 function Child (age) {
  Parent.call(this);
  this.age = age;
 }

 Child.prototype = new Parent();
 Child.prototype.constructor = Child;
 var child2 = new Child(23);
 var child3 = new Child(36)

 /**********原型上继承********************************************* */

 /**
  * 原型继承
  * 原型继承即 ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。
  * 优点：
  * 缺点： 包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。
  */
 function createObj (obj) {
    function F(){}
    F.prototype = obj;
    return new F();
 }
  var person = {
    name: 'kevin',
    friends: ['daisy', 'kelly']
  }
  // 示例
  var person1 = createObj(person);
  var person2 = createObj(person);

  person1.name = 'person1';
  console.log(person2.name); // kevin

  person1.firends.push('taylor');
  console.log(person2.friends); // ["daisy", "kelly", "taylor"]

/*********寄生式继承******************************************* */

/**
 * 寄生式继承（与借用构造函数类似）
 * 是对原型式继承进行了二次封，装这样创建的对象不仅仅有父类的属性和方法，还新增了别的属性和方法
 */

 function create(o) {
   var c = Object.create(o);
   c.getName = function () {
     console.log('get name')
   }
   return c;
 }

 /********寄生组合式继承****************************************************** */

 /**
  * 寄生组合式继承
  * 这种方式的高效率体现它只调用了一次 Parent 构造函数,
  * 并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。
  * 与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。
  * 开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。
  */

  function createObj (o) {
    function F() {}
    F.prototype = o;
    return new F();
  }

  function combine(child, parent){
    var prototype = createObj(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
  }