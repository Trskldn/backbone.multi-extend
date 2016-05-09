var jsdom = require("jsdom").jsdom;
var jquery = require("jquery");

var doc = jsdom('<!doctype html><html><body></body></html>');
var win = doc.defaultView;

global.document = doc;
global.window = win;

Object.keys(win).forEach(function(key) {
  if (!(key in global)) {
    global[key] = win[key];
  }
});