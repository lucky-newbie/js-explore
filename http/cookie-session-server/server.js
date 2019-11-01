/**
 * 演示cookie 和 session
 */

 const http = require('http');
 const fs = require('fs');

 http.createServer(function(request, response) {
  const html = fs.readFileSync('./demo.html', 'utf8');
  response.writeHead(200, {
    'Content-Type': 'text/html',
    'Set-cookie': ['id=1; max-age=2', 'name=Tom', 'age=24; httponly']
  });
  response.end(html)
 }).listen(3000)