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
  // 检验no-store操作
  if (request.url === '/no-store.js') {
    response.writeHead(200, {
      'Cache-Control': 'no-store'
    });
    response.end('1')
  }


  // 检验cache-control：max-age
  if (request.url === '/max-age-demo.js') {
    response.writeHead(200, {
      'Cache-Control': 'max-age=200',
      // 'Cache-Control': 'max-age=2000000, no-cache', // 可设置多个值，逗号分割
      'Last-Modified': '123',
      'Etag': '777'
    });
    response.end('console.log("load 2111")')
  }

  // 检验 Last-Modified和Etag缓存操作
  if (request.url === '/last-modify-demo.js') {
    const etag = request.headers['if-none-match'];
    console.log(1111)
    response.writeHead(200, {
      'Content-type': 'text/javascript',
      'Cache-Control': 'max-age=2000000, no-cache', // 可设置多个值，逗号分割
      'Last-Modified': '123',
      'Etag': '777'
    });
    
    if (etag === '777') {
      response.writeHead(304, {
        'Content-Type': 'text/javascript',
        'Content-type': 'text/javascript',
        'Cache-Control': 'max-age=2000000, no-cache', // 可设置多个值，逗号分割
        'Last-Modified': '123',
        'Etag': '777'
      })
      response.end('读取浏览器缓存')
    } else {
      response.end('console.log("load 2111")')
    }
  }
}).listen(3000)