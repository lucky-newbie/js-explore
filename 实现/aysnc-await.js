// async await 实现
/**
 * 原理就是利用 generator（生成器）分割代码片段。
 * 然后我们使用一个函数让其自迭代，每一个yield 用 promise 包裹起来。
 * 执行下一步的时机由 promise 来控制
 */

function _asyncToGenerator(fn) {
  return function () {
    const self = this;
    const args = arguments;
    return new Promise(function(resolve, reject){
      // 获取generator实例
      const genenrator = fn.apply(self, args);
      // 获取迭代器实例
      function _next(value) {
        asyncGeneratorStep(genenrator, resolve, reject, _next, _throw, 'next', value);
      }
      function _throw(err) {
        asyncGeneratorStep(generator, resolve, reject, _next, _throw, 'throw', err);
      }
      _next(undefined);
    });
  }
}

function asyncGeneratorStep(generator, resolve, reject, _next, _throw, key, args){
  let info;
  try {
    info = generator[key](args);
    const value = info.value;
  } catch (error) {
    reject(error);
  }
  if (info.done) {
    // 迭代器完成
    resolve(value)
  } else {
    // -- 这行代码就是精髓 --
    // 将所有值promise化
    // 比如 yield 1
    // const a = Promise.resolve(1) a 是一个 promise
    // const b = Promise.resolve(a) b 是一个 promise
    // 可以做到统一 promise 输出
    // 当 promise 执行完之后再执行下一步
    // 递归调用 next 函数，直到 done == true
    Promise.resolve(value).then(_next, _throw);
  }
}