module.exports = shellescape;

// return a shell compatible format
function shellescape(a, options) {
  options = typeof options !== 'undefined' ? options : {};
  var ret = [];

  a.forEach(function(s) {
    if (/[^A-Za-z0-9_\/:=-]/.test(s)) {
      s = "'"+s.replace(/'/g,"'\\''")+"'";
      s = s.replace(/^(?:'')+/g, '') // unduplicate single-quote at the beginning
        .replace(/\\'''/g, "\\'" ); // remove non-escaped single-quote if there are enclosed between 2 escaped
    }
    ret.push(s);
  });

  if(options.returnArray == true){
    return ret;
  }
  return ret.join(' ');
}
