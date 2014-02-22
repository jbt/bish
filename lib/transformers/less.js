var less = require('less');

module.exports = function(body, p, fullPath){
  var parser = new(less.Parser)({
    syncImport: true,
    filename: fullPath
  });
  var out;
  parser.parse(body, function(e, r){
    out = r.toCSS();
  });
  return out;
};
