/** 图片懒加载 */
```
<img src="22" alt="1" data-src="http://img4.imgtn.bdimg.com/it/u=951914923,777131061&fm=26&gp=0.jpg">
```
window.onload = function(){
	// 获取图片列表，即img标签列表
	var imgs = document.querySelectorAll('img');

	// 获取到浏览器顶部的距离
	function getTop(e){
		return e.offsetTop;
	}

	// 懒加载实现
	function lazyload(imgs){
		// 可视区域高度
		var h = window.innerHeight;
		//滚动区域高度
		var s = document.documentElement.scrollTop || document.body.scrollTop;
		for(var i=0;i<imgs.length;i++){
			//图片距离顶部的距离大于可视区域和滚动区域之和时懒加载
			if ((h+s)>getTop(imgs[i])) {
        const src = imgs[i].getAttribute('data-src');
        if (imgs[i].src !== src) {
          imgs[i].src = src;//只会请求一次
        }
			}
		}
	}
	lazyload(imgs);

	// 滚屏函数
	window.onscroll =function(){
		lazyload(imgs);
	}
}
