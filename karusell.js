var pype = require('pype-stack');

var o = {
  GET: {},
  POST: {},
  PUT: {},
  PATCH: {},
  DELETE: {},
  add: function(method, url, fn) {
    if (typeof fn === 'function') {
      fn = [fn];
    }
    if (Object.prototype.toString.call(fn) === '[object Array]') {
      var fns = fn.filter(function(x){
        return typeof x === 'function';
      });
      if (!this[method][url]) {
        this[method][url] = [];
      }
      this[method][url] = this[method][url].concat(fns);
    }
  },
  go: function(req, res) {
    if (this[req.method] && this[req.method][req.url]) {
      pype(null, this[req.method][req.url])(req, res);
    } else {
      res.statusCode = 404;
      res.end('Error: No such method or path');
    }
  }
}

for (var k in o) {
  if (typeof o[k] === 'function') {
    o[k] = o[k].bind(o);
  }
}

module.exports = o;
