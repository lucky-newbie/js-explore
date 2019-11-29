/**
 * 防抖
 */

 function debounce(fn, wait) {
  let timeId;
  return function() {
    const args = arguments;
    const context = this;
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(function() {
      fn.apply(context, args)
    }, wait)
  }
 }