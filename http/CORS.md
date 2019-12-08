[cors说明](https://fetch.spec.whatwg.org/#http-cors-protocol)
## CORS(cross-origin sharing standard) 允许方法（除去以下三种方法，需要预检请求）
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

* Access-Control-Expose-Headers
  响应首部 Access-Control-Expose-Headers 列出了哪些首部可以作为响应的一部分暴露给外部。
  1. 默认情况下，只有六种 simple response headers （简单响应首部）可以暴露给外部：
    Cache-Control
    Content-Language
    Content-Type
    Expires
    Last-Modified
    Pragma

  想要暴露一个非简单响应首部，可以这样指定：Access-Control-Expose-Headers: Content-Length, X-Kuma-Revision