* js实现多线程（worker方式）
```
  let worker;
  function startWorker() {
    if (typeof Worker !== 'undefined') {
      if (typeof worker === 'undefined') {
        worker = new Worker('./demo.js')
      }
      worker.onmessage = function(event) {
        console.log(event, event.data)
      }
    }
    
  }
  function stopWorker() {
    worker.terminate();
  }

  // worker-demo.js文件内容
  function count() {
    for (let i = 0; i < 99; i++) {
      postMessage(i)
    }
  }
  count()
```

* web worker存在几点限制
  1. 同源限制： 分配给worker线程运行的脚本文件，必须和主线程文件同源
  2. DOM限制：worker线程所在的全局对象，与主线程不一样，无法获取主线程所在的DOM对象，无法使用document、window、parent对象，但worker线程可以使用navigator对象和location对象
  3. worker线程和主线程不再同一个执行上下文环境中，他们不能直接通信，必须通过消息完成
  4. worker线程不能执行alert、confirm方法，但可以运行XMLHttpRequest对象发Ajax请求
  5. worker线程不能读取本地文件，它加载的脚本必须来自网络

