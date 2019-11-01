
#cache-contole
![请求头中的cache-control](./imgs/cache-req.png)
![响应头中的cache-control](./imgs/cache-res.png)

## 特性： 可缓存性
* public: 任何节点都可以缓存
* private: 只有请求的浏览器缓存
* no-cache: 本地可以存储缓存，但需要服务器校验是否允许使用缓存

## 特性： 到期
* max-age = 秒：缓存多少秒后过期，过期后浏览器在请求服务端获取心得内容
* s-maxage： 代替max-age，但只在服务端起作用， 优先级高于max-age
* max-stale: 在指定时间内， 还是可以获取已过期的资源

## 特性：重新验证(浏览器访问页面时很少用到)
* must-revalidate：
* proxy-revalidate:

## 其他
* no-store: 本地、代理服务器都不存缓存，每次都要从服务器上获取
* no-transform: 用在代理服务器上，不允许代理服务器进行资源压缩改动等操作

* memory-cache: 字面理解是从内存中，其实也是字面的含义，这个资源是直接从内存中拿到的，不会请求服务器一般已经加载过该资源且缓存在了内存当中，当关闭该页面时，此资源就被内存释放掉了，再次重新打开相同页面时不会出现from memory cache的情况
* disk-cache: 此资源是从磁盘当中取出的，也是在已经在之前的某个时间加载过该资源，不会请求服务器但是此资源不会随着该页面的关闭而释放掉，因为是存在硬盘当中的，下次打开仍会from disk cache
  



### 判断缓存流程
![判断缓存流程](./imgs/cache.webp)
参考[cache-control](https://blog.csdn.net/u012375924/article/details/82806617)