var expect = require('chai').expect;
var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var multiExtend = require('./../backbone.multi-extend');


describe('multiExtend', function() {
  var results = [];
  var constructorResults = [];
  var ModelClass1, ModelClass2, ModelClass3, Mixin1, Mixin2, Mixin3, ExtendedClass;
  var oldInitialize;

  beforeEach(function() {
    oldInitialize = Backbone.Model.prototype.initialize;
    results = [];
    constructorResults = [];

    Backbone.Model.prototype.initialize = function() {
      results.push('Backbone.Model.initialize()');
    };

    ModelClass1 = Backbone.Model.extend({
      initialize: function() {
        results.push('ModelClass1.initialize()')
        return this.inherited('initialize', arguments);
      },

      someOtherMethod: function(args) {
        return args;
      }
    });

    ModelClass2 = Backbone.Model.extend({
      constructor: function() {
        constructorResults.push('ModelClass2.constructor()');
        this.inherited('constructor', arguments);
      },

      initialize: function() {
        results.push('ModelClass2.initialize()');
        this.inherited('initialize', arguments);
      },
      someMethod: function() {

      }
    });

    ModelClass3 = Backbone.Model.extend({
      constructor: function() {
        constructorResults.push('ModelClass3.constructor()');
        this.inherited('constructor', arguments);
      },

      initialize: function() {
        results.push('ModelClass3.initialize()');
        this.inherited('initialize', arguments);
      },
      someMethod: function() {

      }
    });


    Mixin1 = {
      initialize: function() {
        results.push('Mixin1.initialize()')
        return this.inherited('initialize', arguments);
      },

      someOtherMethod: function() {
        return 'Mixin1.someOtherMethod()->' + this.inherited('someOtherMethod', 'ModelClass1.someOtherMethod()');
      }
    };

    Mixin2 = {
      initialize: function() {
        results.push('Mixin2.initialize()')
        return this.inherited('initialize', arguments);

      }
    };

    Mixin3 = {
      constructor: function() {
        constructorResults.push('Mixin3.constructor()');
        this.inherited('constructor', arguments);
      },
      initialize: function() {
        results.push('Mixin3.initialize()')
        return this.inherited('initialize', arguments);

      }
    };

    ExtendedClass = ModelClass1.extend([{
      initialize: function() {
        results.push('Extended.initialize()');
        return this.inherited('initialize', arguments);
      }
    }, Mixin1, Mixin2], {
      staticMethod: function() {

      }
    });
  });

  afterEach(function() {
    Backbone.Model.prototype.initialize = oldInitialize;
  });


  it('should do multiple inheritance', function() {
    var extendedClass = new ExtendedClass();

    expect(results).to.be.deep.equal(['Extended.initialize()', 'Mixin1.initialize()',
      'Mixin2.initialize()', 'ModelClass1.initialize()',
      'Backbone.Model.initialize()'
    ])
  });

  it('should pass arguments to super method', function() {
    var extendedClass = new ExtendedClass();
    expect(extendedClass.someOtherMethod()).to.be.equal('Mixin1.someOtherMethod()->ModelClass1.someOtherMethod()')
  });

  it('should have static props staticMethod', function() {
    var extendedClass = new ExtendedClass();

    expect(ExtendedClass).to.have.property('staticMethod');
    expect(ExtendedClass.staticMethod).to.be.a('function');
  });

  it('should handle single inheritance', function() {
    var NewModel = Backbone.Model.extend({
      initialize: function() {
        results.push('NewModel.initialize');
        this.inherited('initialize', arguments);
      }
    });

    var newModel = new NewModel();
    expect(results).to.be.deep.equal(['NewModel.initialize', 'Backbone.Model.initialize()']);
  });

  it('should work properly,when Mixin is Backbone.Model class', function() {

    var NewModel = Backbone.Model.extend([{
      constructor: function() {
        constructorResults.push('NewModel.constructor()');
        this.inherited('constructor', arguments);
      },
      initialize: function() {
        results.push('NewModel.initialize()');
        this.inherited('initialize', arguments);
      }
    }, ModelClass2, Mixin3, ModelClass3]);

    var newModel = new NewModel();
    expect(newModel).to.have.property('someMethod');
    expect(results).to.be.deep.equal(['NewModel.initialize()', 'ModelClass2.initialize()', 'Mixin3.initialize()', 'ModelClass3.initialize()', 'Backbone.Model.initialize()']);
    expect(constructorResults).to.be.deep.equal(['NewModel.constructor()', 'ModelClass2.constructor()', 'Mixin3.constructor()', 'ModelClass3.constructor()']);
  });

  it('should work with Backbone.View', function() {
    var results = [];
    var oldInitialize = Backbone.View.prototype.initialize;

    Backbone.View.prototype.initialize = function() {
      results.push('Backbone.View.initialize()');
    };

    var Mixin1 = {
      initialize: function() {
        results.push('Mixin1.initialize()');
        this.inherited('initialize', arguments);
      }
    };

    var NewView = Backbone.View.extend([{
      initialize: function() {
        results.push('NewView.initialize()');
        this.inherited('initialize', arguments);
      }
    }, Mixin1]);

    var newView = new NewView();
    expect(results).to.be.deep.equal(['NewView.initialize()', 'Mixin1.initialize()', 'Backbone.View.initialize()']);
    Backbone.View.prototype.initialize = oldInitialize;
  });
});