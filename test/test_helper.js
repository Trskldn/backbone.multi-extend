var jsdom = require("jsdom").jsdom;
var doc = jsdom('<!doctype html><html><body></body></html>');
var win = doc.defaultView;
var jquery = require("jquery")(win);

global.window.$ = jquery;
global.document = doc;
global.window = win;

Object.keys(win).forEach(function(key) {
  if (!(key in global)) {
    global[key] = win[key];
  }
});