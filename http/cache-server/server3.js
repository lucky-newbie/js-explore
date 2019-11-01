const http = require('http');


http.createServer(function(request, response){
  const url = request.url;
  console.log(url)
  if (url === '/jsonp?callback=fun') {
    const data = {
      name: 'Tom',
      age: 24
    }
    const str = JSON.stringify(data);
    response.end(`fun(${str})`)
  } else {
    response.end();
  }
}).listen(3003)