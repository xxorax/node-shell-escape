var shellescape = require('../');

var assert = require('assert');

var args = ['curl', '-v', '-H', 'Location;', '-H', 'User-Agent: dave#10', 'http://www.daveeddy.com/?name=dave&age=24'];

var escaped = shellescape(args, {returnArray: true});

var expected = ['curl', '-v', '-H', '\'Location;\'', '-H', '\'User-Agent: dave#10\'', '\'http://www.daveeddy.com/?name=dave&age=24\''];

assert.deepEqual(escaped, expected);
console.log(escaped);
