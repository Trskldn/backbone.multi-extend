var expect = require('chai').expect;
var Backbone = require('backbone');
var multiExtend = require('./../backbone.multi-extend');

describe('multiExtend', function() {
  var results = [];
  var someOtherResults = [];
  var Class1 = Backbone.Model.extend({
    initialize: function() {
      results.push('Class1.initialize()')
      return this.inherited('initialize', arguments);
    },

    someOtherMethod: function(args) {
      return args;
    }
  });

  var Mixin1 = {
    initialize: function() {
      results.push('Mixin1.initialize()')
      return this.inherited('initialize', arguments);
    },

    someOtherMethod: function() {
      return 'Mixin1.someOtherMethod()->' + this.inherited('someOtherMethod', 'Class1.someOtherMethod()');
    }
  };

  var Mixin2 = {
    initialize: function() {
      results.push('Mixin2.initialize()')
      return this.inherited('initialize', arguments);

    }
  }

  var ExtendedClass = Class1.extend([{
    initialize: function() {
      results.push('Extended.initialize()');
      return this.inherited('initialize', arguments);
    }
  }, Mixin1, Mixin2], {
    staticMethod: function() {

    }
  });

  var extendedClass = new ExtendedClass();


  it('should do multiple inheritance', function() {
    expect(results).to.be.deep.equal(['Extended.initialize()', 'Mixin1.initialize()', 'Mixin2.initialize()', 'Class1.initialize()'])
  });

  it('should pass arguments to super method', function() {
    expect(extendedClass.someOtherMethod()).to.be.equal('Mixin1.someOtherMethod()->Class1.someOtherMethod()')
  });

  it('should have static props staticMethod', function() {
    expect(ExtendedClass).to.have.property('staticMethod');
    expect(ExtendedClass.staticMethod).to.be.a('function');
  });

  it('should handle single inheritance', function() {
    var results = [];
    var oldInitialize = Backbone.Model.prototype.initialize;

    Backbone.Model.prototype.initialize = function() {
      results.push('Backbone.Model.initialize');
    };

    var NewModel = Backbone.Model.extend({
      initialize: function() {
        results.push('NewModel.initialize');
        this.inherited('initialize', arguments);
      }
    });

    var newModel = new NewModel();
    expect(results).to.be.deep.equal(['NewModel.initialize', 'Backbone.Model.initialize']);
    Backbone.Model.prototype.initialize = oldInitialize;
  });

  it('should work properly,when Mixin is Backbone.Model class', function() {
    var results = [];
    var constructorResults = [];

    var Mixin1 = Backbone.Model.extend({
      constructor: function() {
        constructorResults.push('Mixin1.constructor');
        this.inherited('constructor', arguments);
      },

      initialize: function() {
        results.push('Mixin1.initialize');
        this.inherited('initialize', arguments);
      },
      someMethod: function() {

      }
    });

    var Mixin2 = {
      initialize: function() {
        results.push('Mixin2.initialize');
        this.inherited('initialize', arguments);
      }
    };


    var Mixin3 = Backbone.Model.extend({
      constructor: function() {
        constructorResults.push('Mixin3.constructor');
        this.inherited('constructor', arguments);
      },

      initialize: function() {
        results.push('Mixin3.initialize');
        this.inherited('initialize', arguments);
      },
      someMethod: function() {

      }
    });

    var NewModel = Backbone.Model.extend([{
      constructor: function() {
        constructorResults.push('NewModel.constructor');
        this.inherited('constructor', arguments);
      },

      initialize: function() {
        results.push('NewModel.initialize');
        this.inherited('initialize', arguments);
      }
    }, Mixin1, Mixin2, Mixin3]);

    var newModel = new NewModel();
    expect(newModel).to.have.property('someMethod');
    expect(results).to.be.deep.equal(['NewModel.initialize', 'Mixin1.initialize', 'Mixin2.initialize', 'Mixin3.initialize']);
    expect(constructorResults).to.be.deep.equal(['NewModel.constructor', 'Mixin1.constructor', 'Mixin3.constructor']);
  });

  it('should work with Backbone.View', function() {
    var results = [];
    var oldInitialize = Backbone.Model.prototype.initialize;

    Backbone.View.prototype.initialize = function() {
      results.push('Backbone.View.initialize');
    };

    var Mixin1 = {
      initialize: function() {
        results.push('Mixin1.initialize');
        this.inherited('initialize', arguments);
      }
    };

    var NewView = Backbone.View.extend([{
      initialize: function() {
        results.push('NewView.initialize');
        this.inherited('initialize', arguments);
      }
    }, Mixin1]);

    var newView = new NewView();
    expect(results).to.be.deep.equal(['NewView.initialize', 'Mixin1.initialize', 'Backbone.View.initialize']);
    Backbone.View.prototype.initialize = oldInitialize;
  });
});
