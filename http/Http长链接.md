
* Connecttion: Keep-Alive/close; chrome最多打开6个tcp链接
  当使用keep-alive（http1.1才支持）时，keep-alive功能使客户端到服务器端的链接持续有效，当出现对服务器的后续请求时，避免了建立重新连接
* HTTP2 提出信道复用，即仅需要一个链接, 可提升性能

http管线化