module.exports = function queryDom (process, exit) {
  let parseDom = require('../lib/parseDom');
  let splitArr = require('../lib/splitArr');
  let args = splitArr(process.argv.slice(2), /^--/);
  let selector = args[0].pop();
  let input = args[0].pop();
  let operations = args[1].map(op => op.replace(/^--/, '').split('='));

  if (typeof input !== 'undefined') {
    writeOutput(input);
  }
  else {
    readStdin().then(writeOutput);
  }

  function readStdin() {
    return new Promise(function (resolve, reject) {
      let result = '';
      process.stdin.resume();
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', data => result += data);
      process.stdin.on('end', () => resolve(result));
    });
  }

  function writeOutput(html) {
    let output = parseDom(html, selector);

    if (!operations.length) {
      output = output.text();
    }
    else {
      output = operations.reduce(applyOperation, output);
    }

    process.stdout.write(output + '\n');
    exit(0);
  }

  function applyOperation(collection, operation) {
    let [ op, val ] = operation;
    return typeof val !== 'undefined' ? collection[op](val) : collection[op]();
  }
};
