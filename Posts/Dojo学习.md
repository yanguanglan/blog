# Dojo学习

## declare

1. 入门

```js
require([
  "dojo/_base/declare"
], function (declare) {
  var Person = declare(null, {
    name:'nono',
    getName: function(){
      return this.name;
    },
    setName: function(name){
      this.name = name;
    }
  })
  
  var p = new Person();
  console.log(p.name);
  console.log(p.getName());
  p.setName('yangjunjun');
  console.log(p.getName());
});  
```

2. 初始化加入参数

```js
require([
  "dojo/_base/declare"
], function (declare) {
  var Person = declare(null, {
    name:'nono',
    getName: function(){
      return this.name;
    },
    setName: function(name){
      this.name = name;
    },
    constructor: function(args){
      declare.safeMixin(this, args);
    }
  })
  
  var p = new Person({
    name:'yangjunjun'
  });
  console.log(p.name);
}); 
```



3. 多重继承(Inheritance)

```js
require([
  "dojo/_base/declare"
], function (declare) {
  var A = declare('yangjunjun.A', null, {
    name:'A',
    age: 1,
    a:'aaa'
  })
  var B = declare('yangjunjun.B', null, {
    name:'B',
    age: 2
  })

  var C = declare('yangjunjun.C',[yangjunjun.A, yangjunjun.B],{

  })
  var c = new C();
  console.log(c.name);
  console.log(c.age);
  console.log(c.a);
});
```
4. 多重继承那个 + 初始化

```js
require([
  "dojo/_base/declare"
], function (declare) {
  var A = declare('yangjunjun.A', null, {
    name:'A',
    age: 1,
    a:'aaa'
  })
  var B = declare('yangjunjun.B', null, {
    name:'B',
    age: 2
  })

  var C = declare('yangjunjun.C',[yangjunjun.A, yangjunjun.B],{
    constructor: function(args){
      declare.safeMixin(this, args);
    }
  })
  var c = new C();
  console.log(c.name);
  console.log(c.age);
  console.log(c.a);
  var c1 = new C({
    name:'C',
    age:3
  });
  console.log(c1.name);
  console.log(c1.age);
  console.log(c1.a);
});
```