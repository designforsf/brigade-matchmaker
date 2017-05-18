/*
  call-algo

  A test which calls match-algo.py with arguments.

  To install and run:

    npm install python-shell
    node call-algo.js

  SEE: https://github.com/extrabacon/python-shell

*/

var PyShell = require('python-shell');

var opts = {
  args: ["javascript,python", "housing", "developer,presenter"]
};

PyShell.run('match-algo.py', opts, function (err, output) {
  if (err) throw err;
  console.log('match-algo.py output: ');
  output.forEach(function (line, idx){
    console.log(' ' + idx + ' ' + line)
  })

});
