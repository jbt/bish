# Bish

Super-tiny asset (javascript) concatenation and dependencies, &agrave; la [smash](//github.com/mbostock/smash).

## Installation

```
npm install bish
```

## Usage

**foo.js**

```js
import "bar.js"

alert('bye');
```

**bar.js**

```js
alert('hi');
```


Then:

```js
var bish = require('bish', { /* optional options */ });

bish('path/to/foo.js'); // "alert('hi');\n\nalert('bye');"
```

### Command-line

```sh
$ npm install -g bish
$ bish path/to/foo.js > baz.js
```

## Other features

 * Require directory: `import "dir";` to include all files in a directory (recursively) in order
 * Transformers: see below
 * List deps: `bish.deps('file.js');` - lists all files included in `file.js`
 * Require paths: specify `paths: [ 'path1', 'path2' ]` in options

## Transformers

You may want to transform some files based on their extension, for example LESS to CSS.

Usage: `bish('file.ext', { transformers: { ext: transformFn } });`

`transformFn` is called with arguments `(fileContents, relativePath, fullPath)` where relativePath is relative to the root dir (`root` in options object), and fullPath is the full file path.
