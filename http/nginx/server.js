/**
 * 测试nginx上的缓存配置
 */

 const http = require('http');
 const fs = require('fs');

 const wait = (second) => {
   return new Promise(function(resolve, reject) {
     setTimeout(function() {
       resolve()
     }, second * 1000)
   })
 }

 http.createServer(function (request, response) {
  console.log(request.headers.host) 
  const html = fs.readFileSync('index.html', 'utf-8')
  // s-maxage 在代理服务器层面设置缓存时间， 优先级高于max-age
  if (request.url === '/') {
    response.writeHead(200, {
      'Content-Type': 'text/html',
     })
     response.end(html)
  }
  if (request.url === '/api') {
    response.writeHead(200, {
      'Cache-Control': 'max-age=2, s-maxage=200', // s-maxage在代理服务器层面设置缓存时间，大于max-age
      'Vary':'x-Test-cache' // 仅有与该http头相同时才会使用缓存， 比如判断ua区分手机还是pc，来判断是否需要使用缓存
    })
    wait(2)
    .then(() => {
      response.end('data')
    })
  }
 }).listen(3000)