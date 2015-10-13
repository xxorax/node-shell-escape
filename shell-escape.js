module.exports = shellescape;

// return a shell compatible format
function shellescape(a) {
  var ret = [];

  if (process.platform==="win32") {
    a.forEach(function(s) {
      if (/[\s\\"]/.test(s)) {
        var backslashes = 0, c, rep = "\"";
        var flushBackslashes = function fbs(n) {
          rep = rep + repeat("\\",n*backslashes);
          backslashes = 0;
        };
        for (var i=0,slen=s.length;i<slen;i++) {
          c = s.charAt(i)
          if (c==="\\") {
            backslashes++
          }
          else if (c==="\"") {
            flushBackslashes(2)
            rep = rep + "\\\""
          }
          else {
            flushBackslashes(1)
            rep = rep + c
          }
        }
        flushBackslashes(2)
        rep = rep + "\""
        s = rep
      }
      ret.push(s);
    })
  }
  else {
    a.forEach(function(s) {
      if (/[^A-Za-z0-9_\/:=-]/.test(s)) {
        s = "'"+s.replace(/'/g,"'\\''")+"'";
        s = s.replace(/^(?:'')+/g, '') // unduplicate single-quote at the beginning
          .replace(/\\'''/g, "\\'" ); // remove non-escaped single-quote if there are enclosed between 2 escaped
      }
      ret.push(s);
    })
  }

  return ret.join(' ');
}

function repeat(s,n) { // mini String.prototye.repeat
  var result = ''
  while (n) {
    if (n%2 == 1) {
      result += s
    }
    if (n>1) {
      s += s
    }
    n >>= 1
  }
  return result
}
