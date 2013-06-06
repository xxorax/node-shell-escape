var util = require('util');

// dangerous characters to the shell,
// see http://mywiki.wooledge.org/BashGuide/SpecialCharacters
var escapechars = [
  ' ',
  ';',
  '&',
  '#',
  '>',
  '<',
  '{',
  '}',
  '$',
  '(',
  ')',
  '[',
  ']',
  '\'',
  '"',
  '|',
  '*',
  '!',
  '^',
  '?',
  '+',
  '~',
  '`'
];

module.exports = shellescape;

// return a shell compatible format
function shellescape(a) {
  var ret = [];

  a.forEach(function(s) {
    // quote troublesome characters
    for (var i = 0; i < escapechars.length; i++) {
      if (s.indexOf(escapechars[i]) > -1) {
        s = util.inspect(s);
        break;
      }
    }

    ret.push(s);
  });

  return ret.join(' ');
}
