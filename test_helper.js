var jsdom = require('jsdom');
var doc = jsdom.jsdom("<!doctype html><html><body></body></html>");
var win = doc.defaultView;

// win.document = doc;
global.document = doc;
global.window = win;

var jquery = require("jquery");

Object.keys(win).forEach(function(key) {
  if (!(key in global)) {
    global[key] = win[key];
  }
});