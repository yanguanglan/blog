# (x)HTML中的script标签研究

## Script 的堵塞(block)特性

> Scripts without async or defer attributes, as well as inline scripts, are fetched and executed immediately, before the browser continues to parse the page. - MDN


> he blocking nature of JavaScript, which is to say that nothing else can happen while JavaScript code is being executed. In fact, most browsers use a single process for both user interface (UI) updates and JavaScript execution, so only one can happen at any given moment in time. The longer JavaScript takes to execute, the longer it takes before the browser is free to respond to user input. - Nicholas C. Zakas「High Performance JavaScript 」

## 非堵塞Scripts(Nonblocking Scripts) 

### 1. Deferred Script (延迟脚本)

Script 有一个 defer 属性，拥有这个属性的script表明这个script不会修改DOM，因此这段脚本会在文档树全部解析完成后触发( to be executed after the document has been parsed). 但这个属性并不被所有的浏览器支持。

### 2. Dynamic Script Elements (动态脚本)

原理就是使用脚本创建 script 元素，设置 src 需为要动态添加脚本的 URL，再把这个 script 添加到DOM中。有时我们需要动态脚本加载完成后再执行某些操作，这就需要我们在脚本加载完成后添加一个回调函数，这个可以通过 script 的 onload 事件实现。下面的实现代码：

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
当有大量的脚本需要动态添加时，这样写也会遇到问题；另外的解决方案是利用一些现成的库，比如 LABjs

### 3. XMLHttpRequest Script Injection (XHR动态插入)
原理是利用XMLHttpReques(XHR)对象，动态获取一段JS代码，然后插入文档。
相对其他方法来说的一个优点是可以“懒执行”，也就是JS代码已经先下载好了并没有执行，可以在需要的来执行(?)。(之前的动态脚本在下载后会立即执行)，实现代码；

```js
function xhrLoadJS (url, callback){
  var xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.onreadystatechange = function(){
    if(xhr.readyState == 4){
      if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
        var script = document.createElement('script');
        script.type = 'text/script';
        script.text = xhr.responseText;
        eval(xhr.responseText);  // 执行代码
        document.body.appendChild(script);
        callback();
      }
    }
  }
  xhr.send(null);
}
```
缺点是不能跨域请求

## 参考
1. [Javascript 装载和执行](http://coolshell.cn/articles/9749.html)
2. [MDN Script元素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
3. Nicholas C. Zakas 所著的「High Performance JavaScript 」的第一章 "Loading and Execution"