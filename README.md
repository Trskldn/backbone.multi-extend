# Backbone.multi-extend
![travis build](https://travis-ci.org/Trskldn/backbone.multi-extend.svg?branch=master)

multiple inheritance,with super method call, for Backbone classes

## Motivation
By default, Backbone classes support only single inheritance without explicit
parents overrriden method call. Backbone.multi-extend, extend backobne extend to handle
multiple inherintance + simple parent overriden method call, next in chains


## Instalation

#### bower
`bower i --save backbone.multi-extend`

#### npm
`npm i --save backbone.multi-extend`

#### global
checkout `dist/backbone.multi-extend.min.js`



## Usage

#### CommonJs
```js
var MultiExtend = require('backbone.multi-extend');
```


#### RequireJs

```js
require(['backbone.multi-extend'], function(){

});
```

#### global
```js
<script src="backbone.js"></script>
<script src="underscore.js"></script>
<script src="backbone.multi-extend.js"></script>

```

## Example


```js
var Mixin1 = {
  initialize:function (){
    this.inherited('initialize', arguments);
  }
};

var Mixin2 = Backbone.Model.extend({
  initialize:function (){
    this.inherited('initialize', arguments);
  }
});

var Mixin3 = {
  initialize:function (){
    this.inherited('initialize', arguments);
  }
};

var NewModel = Backbone.Model.extend([{
  initialize: function(){
    this.inherited('initialize', arguments);
  }
}, Mixin1, Mixin2, Mixin3]);

var newModel = new NewModel();
// invoke initialize in next order
NewModel.initialize()-->Mixin1.initialize()-->Mixin2.initialize()-->Mixin3.initialize()-->Backbone.Model.initialize()

```
