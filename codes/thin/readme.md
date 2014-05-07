#从零开始编写自己的JavaScript框架



## 模块的定义

```js

(function() {
  var moduleMap = {};
  window.thin = {
    define: function(name, dependencies, factory) {
      if (!moduleMap[name]) {
        var module = {
            name: name,
            dependencies: dependencies,
            factory: factory
        };
        moduleMap[name] = module;
      }
      return moduleMap[name];
    }
  };
})();

```
## 模块的使用

```js

use: function(name){
  var module = moduleMap[name];
  if(!module.entity){
    var args = [];
    for(var i=0; i < module.dependencies.length; i++){
      if(moduleMap[module.dependencies[i].entity]){
        args.push(moduleMap[module.dependencies[i].entity]);
      }
      else{
        args.push(this.use(module.dependencies[i]));
      }
    }
    module.entity = module.factory.apply(noop, args);
  }
  return module.entity;
}

```

## 模块的加载




## 参考
1. [从零开始编写自己的JavaScript框架（一）](http://blog.xufei.gitpress.org/~posts/2013-07-01-%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E7%BC%96%E5%86%99%E8%87%AA%E5%B7%B1%E7%9A%84JavaScript%E6%A1%86%E6%9E%B6%EF%BC%88%E4%B8%80%EF%BC%89.md)
2. [从零开始编写自己的JavaScript框架（二）](http://blog.xufei.gitpress.org/~posts/2013-07-10-%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E7%BC%96%E5%86%99%E8%87%AA%E5%B7%B1%E7%9A%84JavaScript%E6%A1%86%E6%9E%B6%EF%BC%88%E4%BA%8C%EF%BC%89.md)