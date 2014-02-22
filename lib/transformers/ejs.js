var ejs = require('ejs');

module.exports = function(body, path){
  body = ejs.parse(body, {compileDebug: false});
  return '(function(){(this.JST || (this.JST = {}))[' + JSON.stringify(path.replace(/\.ejs$/, '')) + '] = function(a){ var locals = a || {}; '  + "function escape(s){return(\"\"+s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\"/g,'&quot;');}\n" + body + '};}).call(this);\n';
};
