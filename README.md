shell-escape
============

Escape and stringify an array of arguments to be executed on the shell

Install
-------

    npm install shell-escape

Example
-------

### simple

``` js
var shellescape = require('shell-escape');

var args = ['curl', '-v', '-H', 'Location;', '-H', 'User-Agent: dave#10', 'http://www.daveeddy.com/?name=dave&age=24'];

var escaped = shellescape(args);
console.log(escaped);
```

yields

```
curl -v -H 'Location;' -H 'User-Agent: dave#10' 'http://www.daveeddy.com/?name=dave&age=24'
```

A command suitable for being executed by the shell

### advanced

``` js
var shellescape = require('shell-escape');

var args = ['echo', 'hello!', 'how are you doing $USER', '"double"', "'single'"];

var escaped = shellescape(args);
console.log(escaped);
```

yields

```
echo 'hello!' 'how are you doing $USER' '"double"' ''"'"'single'"'"''
```

and when run on the shell

```
$ echo 'hello!' 'how are you doing $USER' '"double"' ''"'"'single'"'"''
hello! how are you doing $USER "double" 'single'
```

### Returning an array

You can return an array suitable for use with Node.js child_process.spawn.

```js
var shellescape = require('shell-escape');
var args = ['-la', '/tmp/my path'];

var escaped = shellescape(args, {returnArray: true});
console.log(escaped);
```

yields

```
[ '-la', '\'/tmp/my path\'' ]
```

License
-------

MIT
