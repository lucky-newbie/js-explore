/**
 * reduce实现
 */

 Array.prototype.myreduce = function (callback) {
   // 拿到数组
   const array = this;
   const len = array.length;
   // 下标值
   let index = 0;
   // 累加器
   let accumulator = undefined;
   // index下标对应的值是否存在
   let present = false;
   // 初始值
   let initValue = arguments.length > 1 ? arguments[1] : undefined;
   if (typeof callback !== 'function') {
     throw new Error('callback is not a function')
   }

   // 数组为空，并且有初始值，则报错
   if (len === 0 && arguments < 2) {
    throw new Error('reduce of empty array with no initial value')
   }

   // 如果初始值存在，则设置累加器为初始值
   if (arguments.length > 1) {
    accumulator = initValue;
   } else { // 初时值不存在
     accumulator = array[index];
     ++index
   }

   while (index < len) {
    // 判断是否为 empty [,,,]
    present = array.hasOwnProperty(index);
    if (present) {
      const currentValue = array[index];
      accumulator = callback.apply(undefined, [accumulator, currentValue, index, array])
    }
    ++index;
   }
   return accumulator;
 }