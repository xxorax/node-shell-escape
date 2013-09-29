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
function shellescape(a, options) {
  options = typeof options !== 'undefined' ? options : {};
  var ret = [];

  a.forEach(function(s) {
    // quote troublesome characters
    for (var i = 0; i < escapechars.length; i++) {
      if (s.indexOf(escapechars[i]) > -1) {
        s = util.inspect(s);
        break;
      }
    }

    // escaping ' doesn't work, replace with ''"'"'
    s = s.replace(/\\\'/g, '\'"\'"\'');

    ret.push(s);
  });

  if(options.returnArray == true){
    return ret;
  }
  return ret.join(' ');
}
