var test = require('tape'),
    router = require('../karusell'),
    fn = function(req, res, next){
      req.data = (req.data) ? req.data +1: 1;
      return next();
    };

test('.add', function(t){
  router.add('GET', '/', fn);
  t.equal(router.GET['/'].length, 1, 'single function to path by method');
  router.add('GET', '/', [fn, fn]);
  t.equal(router.GET['/'].length, 3, 'array of functions to path by method');
  t.end();
});

test('.go', function(t){
  var req = {method: 'GET', url: '/'},
      res = {};
  router.go(req, res);
  t.equal(req.data, 3, 'calls middleware at path by method');
  t.end();
});
