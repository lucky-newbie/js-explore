[cors说明](https://fetch.spec.whatwg.org/#http-cors-protocol)
## CORS 允许方法（除去以下三种方法，需要预检请求）
* get
* post
* head

## 允许的Content-type（出去以下三种，需要预检请求）
* text/plain
* multipart/form-data
* application/x-www-form-uriencoded

## 其他限制
* 请求头
* XMLHttpRequestUpload对象均没有注册任何事件监听器（不常用）
* 请求中没有使用ReadableStream对象（不常用）

## 预检请求
* 浏览器的预检请求通过response中的Access-Control-Allow-Header 来判断是否有返回值