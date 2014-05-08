(function() {
  var moduleMap = {};
  var fileMap = {};
  var noop = function(){};
  window.thin = {
    // 模块定义
    define: function(name, dependencies, factory) {
      if(!fileMap[name]){
        this.require([name],function(){
          if (!moduleMap[name]) {
            var module = {
                name: name,
                dependencies: dependencies,
                factory: factory
            };
            moduleMap[name] = module;
          }
          return moduleMap[name]; 
        })
      }
    },
    // 模块使用
    use: function(name){
      if(!moduleMap[name]){
        this.require([name], function(){
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
        })
      }
      else {
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

    },
    // 模块的使用
    require: function (pathArr, callback) {
      for (var i = 0; i < pathArr.length; i++) {
        var path = pathArr[i];

        if (!fileMap[path]) {
          var head = document.getElementsByTagName('head')[0];
          var node = document.createElement('script');
          node.type = 'text/javascript';
          node.async = 'false';
          node.src = path + '.js';
          node.onload = function () {
            fileMap[path] = true;
            head.removeChild(node);
            checkAllFiles();
          };
          head.appendChild(node);
        }
      }

      function checkAllFiles() {
        var allLoaded = true;
        for (var i = 0; i < pathArr.length; i++) {
            if (!fileMap[pathArr[i]]) {
              allLoaded = false;
              break;
            }
        }

        if (allLoaded) {
            callback();
        }
      }
    }
  };
})();