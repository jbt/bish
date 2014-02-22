var path = require('path');
var fs = require('fs');

var defaultTransformers = {
  ejs: './transformers/ejs',
  less: './transformers/less'
};

module.exports = function(file, opts){

  var seenFiles = {};
  opts = opts || {};
  var prefix = opts.prefix || 'import';
  var transformers = opts.transformers || {};
  var root = path.resolve(opts.root || '.');
  var paths = opts.paths || ['.'];

  function resolve(p, file){
    var pp = path.resolve(path.dirname(file), p);
    if(fs.existsSync(pp)) return pp;

    for(var i = 0; i < paths.length; i += 1){
      pp = path.resolve(root, paths[i], p);
      if(fs.existsSync(pp)) return pp;
    }
    throw "Unable to resolve import \"" + p + '" in ' + file;
  }

  function processFile(filePath){
    if(seenFiles[filePath]) return '';
    seenFiles[filePath] = true;

    if(fs.statSync(filePath).isDirectory()){
      var files = fs.readdirSync(filePath).sort();
      return files.map(function(f){
        return processFile(path.join(filePath, f));
      }).join('\n');
    }

    var ext = path.extname(filePath).replace(/^\./, '')
    var transformer = transformers[ext];
    if(!transformer){
      transformer = defaultTransformers[ext] ? require(defaultTransformers[ext]) : function(x){ return x; };
    }

    var lines = fs.readFileSync(filePath).toString().split('\n');

    lines = lines.map(function(line){
      if(line.indexOf(prefix) === 0){
        var match = /^\s+"([^"]+)"\s*;?\s*(?:\/\/.*)?$/.exec(line.slice(prefix.length));
        if(!match) throw 'Bad import: "' + line + '"';
        return processFile(resolve(match[1], filePath));
      }else{
        return line;
      }
    });

    return transformer(lines.join('\n'), filePath.replace(root+'/', ''), filePath);
  }

  return processFile(resolve(file), '.');
};
