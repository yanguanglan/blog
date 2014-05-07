## (x)HTML中的script标签研究

### 堵塞 document
1. 内联script
2. script有src属性

## 非堵塞Scripts(Nonblocking Scripts) 

### 1. Deferred Script

Script 有一个 defer 属性，拥有这个属性的script表明这个script不会修改DOM，因此这段脚本会在文档树全部解析完成后触发( to be executed after the document has been parsed). 但这个属性并不被所有的浏览器支持。

### 2. Dynamic Script Elements (动态添加脚本)

原理就是使用脚本创建script元素，设置src需为要动态添加脚本的url，在把这个script添加到DOM中。有时我们需要动态脚本加载完成后再执行某些操作，这就需要我们在脚本加载完成后添加一个回调函数，这个可以通过script的onload事件实现。下面的实现代码：

```js
function loadJS(url, callback){
  var script = document.createElement('script');
  script.type = 'text/javascript';
  if(script.readyState){  // 兼容IE的旧版本
    script.onreadystatechange = function(){
      if(script.readyState == 'loaded' || script.readyState == 'complete'){
        script.onreadystatechange = null;
        callback();
      }
    }
  }
  else{ 
    script.onload = function(){
      callback();
    }    
  }
  script.src = url;
  document.getElementsByTagName('head')[0].appendChild(script);
}
```

有时我们需要我们动态加载的脚本按照我们加载的顺序执行，但上面的实现并不能保证这一点，加载的脚本在下载完成后就会立即执行，而不会按照我们定义的顺序。要解决这个问题也不难，可以参照下面的代码：

```js
loadJS('a.js', function(){
  loadJS('b.js', function(){
    loadJS('c.js', function(){
      app.init();
    })
  })
})
```
## 参考
1. [Javascript 装载和执行](http://coolshell.cn/articles/9749.html)
2. [MDN Script元素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
3. Nicholas C. Zakas 所著的「High Performance JavaScript 」的第一章 "Loading and Execution"