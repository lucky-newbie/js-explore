/**
 * 演示cookie 和 session
 */

 const http = require('http');
 const fs = require('fs');

 http.createServer(function(request, response) {
  const html = fs.readFileSync('./demo.html', 'utf8');
  response.writeHead(200, {
    'Content-Type': 'text/html',
    'Set-cookie': [
      'id=1; max-age=2',
      'name=Tom',
      'age=24; httponly',
      'sex=male; domain=xxx.com' //  xxx.com的子域名下都可以访问到当前cookie sex=male
    ]
  });
  response.end(html)
 }).listen(3000)