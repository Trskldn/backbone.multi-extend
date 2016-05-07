;
(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'underscore', 'backbone.inherited'], factory);
  } else if (typeof exports === 'object') {
    var Backbone = require('backbone');
    var _ = require('underscore');
    var InheritedMixin = require('backbone.inherited');

    module.exports = factory(Backbone, _, InheritedMixin);
  } else {
    root.BackboneInheritedMixin = factory(root.Backbone, root._, root.BackboneInheritedMixin);
  }

}(this, function(Backbone, _, InheritedMixin) {

  var oldExtend = Backbone.Model.extend;

  var multiExtend = function( /*Array*/ aMixins, /*Object*/ staticProps) {
    var props,
      NextClass = this,
      staticProps = staticProps || {};

    aMixins = (_.isArray(aMixins) ? aMixins : [aMixins]).slice();

    while ((props = aMixins.pop())) {
      NextClass = oldExtend.call(NextClass, props);
    }

    if (NextClass.prototype.inherited === undefined) {
      NextClass = oldExtend.call(NextClass, InheritedMixin);
    }

    _.extend(NextClass, staticProps);

    return NextClass;
  };

  _(['Model', 'Collection', 'Router', 'View', 'History']).each(function(className) {
    Backbone[className].extend = multiExtend;
  });

  return multiExtend;
}));
