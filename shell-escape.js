var util = require('util');

module.exports = shellescape;

// return a shell compatible format
function shellescape(a) {
  var ret = [];

  a.forEach(function(s) {
    if (!/^[A-Za-z0-9_\/-]+$/.test(s))
      s = '$' + util.inspect(s);
    ret.push(s);
  });

  return ret.join(' ');
}
