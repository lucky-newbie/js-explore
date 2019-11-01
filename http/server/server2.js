const http = require('http');


http.createServer(function(request, response) {
  console.log('request come')
  response.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Controle-Allow-Header': 'XXX',
    'Access-Contole-Allow-method': 'Post, Put, Delete',
    'Access-Control-Max-Age': '1000' // 1000秒， 即1000秒内不需要在发送预检请求
  })
  // 浏览器期望跨域时请求是安全的，所以需要以上判断
  response.end('123')
}).listen(3002)