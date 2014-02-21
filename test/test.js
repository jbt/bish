var path = require('path');
var smsh = require('../index');

console.log(smsh(path.resolve(__dirname, 'fixtures', '3', 'a.js')));
