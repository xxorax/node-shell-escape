
var fs = require('fs');

fs.readdirSync('test').forEach(function(file) {
  var rfile = 'test/' + file;
  console.log(file);
  require('./' + rfile);
  console.log();
});

console.log('Passed');
