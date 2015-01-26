var less = require('less');


if(less.version[0] < 2){

  module.exports = function(body, p, fullPath){
    var parser = new(less.Parser)({
      syncImport: true,
      filename: fullPath
    });
    var out;
    parser.parse(body, function(e, r){
      if(e) throw e;
      out = r.toCSS();
    });
    return out;
  };

} else {

  module.exports = function(body, p, fullPath){
    var out;
    less.render(body, {
      syncImport: true,
      filename: fullPath
    }, function(e, r){
      if(e) throw e;
      out = r.css;
    });
    return out;
  };

}
