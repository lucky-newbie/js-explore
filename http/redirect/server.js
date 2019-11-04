/**
 * 重定向301/302
 */

 const http = require('http');

 http.createServer(function(request,  response) {
  console.log(request.url)
  console.log('*******302示例****')
  if (request.url === '/') {
    response.writeHead(302, {
      'Location': '/new' // 指定重定向地址
    })
    response.end('first ')
  }
  if (request.url === '/new') {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end('302重定向')
  }
  console.log('*******302示例结束****')
  console.log('*******301示例****')
  if (request.url === '/301') {
    response.writeHead(301, {
      'Location': '/301new',
      'Content-Type': 'text/html'
    });
    response.end('又改为200啦');
  }
  if (request.url === '/301new') {
    response.writeHead(200, {
      'Content-Type': 'text/html'
    })
    response.end('301重定向')
  }

 }).listen(3000)