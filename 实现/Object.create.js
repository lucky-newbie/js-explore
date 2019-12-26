// Object.create实现

function create(obj) {
  function F() {}
  F.prototype = Obj;
  return new F();
}