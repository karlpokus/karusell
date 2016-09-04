# karusell
Router for node

# install
```
$ npm i karusell
```

# usage
```javascript
var router = require('karusell');
router.add('GET', '/', fn); // add single fn or array of fns
server.on('request', router.go); // apply router
```

# test
```
$ npm test
```

# licence
MIT
