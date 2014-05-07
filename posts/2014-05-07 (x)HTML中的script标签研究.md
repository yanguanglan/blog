## (x)HTML中的script标签研究

### 堵塞 document
1. 内联script
2. script有src属性

## 非堵塞Scripts(Nonblocking Scripts) 

1. Deferred Script

script 有一个 defer 属性，拥有这个属性的script表明这个script不会修改DOM，因此这段脚本会在文档树全部解析完成后触发( to be executed after the document has been parsed). 但这个属性并不被所有的浏览器支持。

## 参考
1. [Javascript 装载和执行](http://coolshell.cn/articles/9749.html)
2. [MDN Script元素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script)
3. Nicholas C. Zakas 所著的「High Performance JavaScript 」的第一章 "Loading and Execution"