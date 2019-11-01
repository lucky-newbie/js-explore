/**
 * 验证cache-control缓存
 */
const http = require('http');
const fs = require('fs');

http.createServer(function(request, response) {
  const html = fs.readFileSync('cache-demo.html', 'utf8');
  if (request.url === '/') {
    response.writeHead(200, {
      'Content-Type': 'text/html',
    })
    response.end(html)
  }
  if (request.url === '/cache-demo.js') {
    response.end('console.log("load")')
    // response.writeHead(200, {
    //   'Cache-Control': 'max-age=200'
    //   'Cache-Control': 'max-age=200, public' // 可设置多个值，逗号分割
    // });
    // response.end('console.log("load 2111")')
  }
}).listen(3000)