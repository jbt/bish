var path = require('path');
var fs = require('fs');
var assert = require('assert');

var bish = require('../index');

var testDir = path.resolve(__dirname, 'data');

var tests = [
  { in: 'nothing.js',                 out: 'nothing.js' },
  { in: 'import-foo.js',              out: 'foo.js' },
  { in: 'import-foo-bar.js',          out: 'foobar.js' },
  { in: 'import-foo-foo.js',          out: 'foofoo.js' },
  { in: 'import-foo-foo-bar-foo.js',  out: 'foofoobarfoo.js' },
  { in: 'import-self.js',             out: 'empty.js' },
  { in: 'import-circular-foo.js',     out: 'barfoo.js' },
  { in: 'import-dir.js',              out: 'abc.js' },
  { in: 'import-a-b-c.js',            out: 'abc.js',    options: { paths: ['.', 'dir'] } },
  { in: 'abcde.less',                 out: 'abcde.css' }
];


tests.forEach(function(test){

  var opts = test.options || {};
  opts.root = opts.root || testDir;

  it(test.in, function(){

    var generated = bish(test.in, opts);
    var expected = fs.readFileSync(path.resolve(testDir, test.out)).toString();

    assert.strictEqual(generated, expected);

  });
});
