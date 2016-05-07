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
  }, Mixin1, Mixin2]);

  var extendedClass = new ExtendedClass();


  it('should do multiple inheritance', function() {
    expect(results).to.be.deep.equal(['Extended.initialize()', 'Mixin1.initialize()', 'Mixin2.initialize()', 'Class1.initialize()'])
  });

  it('should pass arguments to super method', function() {
    expect(extendedClass.someOtherMethod()).to.be.equal('Mixin1.someOtherMethod()->Class1.someOtherMethod()')
  });
});