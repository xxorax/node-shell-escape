var child_process = require('child_process');
var assert = require('assert');
var shellescape = require('..');

if (process.platform !== 'win32') return;

if (process.argv[2] === 'args') {
  console.log(process.argv.slice(3).join('#'));
}
else {
  var exec = function exec(args) {
    var escaped = shellescape(args);
    var command = 'node ' + __filename + ' args ' + escaped;
    var out = child_process.execSync(command);
    return String(out).trim(); // trim to remove extra \n appended by cmd
  };

  var testCases = [
    ['a', 'b.txt', 'c/d', "'e'"], // normal strings
    ['a\\b', 'a b', 'a\tb', 'a\\\\\\b', 'a"b"c"d"\\"\\'] // should escape backslash, space and tab
  ];

  testCases.forEach(function(testCase, index) {
    var execResult = exec(testCase);
    assert.strictEqual(execResult, testCase.join('#'));
  });

  // should not escape normal strings
  assert.strictEqual(shellescape(['a', 'b.txt', 'c/d', '&', '&&', '<', '>', '|', '||']), 'a b.txt c/d & && < > | ||');
}
