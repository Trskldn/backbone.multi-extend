# Backbone.multi-extend
![travis build](https://travis-ci.org/Trskldn/backbone.multi-extend.svg?branch=master)

multiple inheritance,with super method call, for Backbone classes

## Instalation

bower
```bash
$ bower i --save backbone.multi-extend
```
npm
```bash
$ npm i --save backbone.multi-extend
```

global
just  checkout `backbone.multi-extend.min.js` from this repo


## Usage

CommonJs
```js
var MultiExtend = require('backbone.multi-extend');
```

RequireJs
```js
require(['backbone.multi-extend'], function(){

});
```

global
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
// invoke initialize method in next order
// NewModel.initialize()-->Mixin1.initialize()-->Mixin2.initialize()-->Mixin3.initialize()-->Backbone.Model.initialize()

```
