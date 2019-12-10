// 测试web worker
function count() {
  for(let i = 0; i < 99; i++) {
    postMessage(i);
  }
}
count();