# backbone.multi-extend

multiple inheritance,with super method call, for Backbone classes

```javascript
var Mixin1 = {
  initialize:function (){
    this.inherited('initialize', arguments);
  }
};

var Mixin2 = {
  initialize:function (){
    this.inherited('initialize', arguments);
  }
};

var NewModel = Backbone.Model.extend([{
  initialize: function(){
    this.inherited('initialize', arguments);
  }
}, Mixin1, Mixin2])

var newModel = new NewModel(); // invoke NewModel.initialize()-->Mixin1.initialize()-->Mixin2.initialize()-->Backbone.Model.initialize()

```