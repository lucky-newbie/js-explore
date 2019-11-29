/**
 * 截流实现
 */
function throttle(fn, delay) {
  const preTime = Data.now();
  return function() {
    const current = Date.now();
    if (current - preTime > delay) {
      fn.apply(this, arguemens);
      preTime = current;
    }
  }
}