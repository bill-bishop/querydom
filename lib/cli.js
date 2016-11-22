#!/usr/bin/env node

module.exports = function (process, exit) {
  let parseDom = require('../lib/parseDom');
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

  function splitArr(array, pattern) {
    i = 0;
    for (let e of array) {
      if (pattern.test(e)) break;
      i++;
    }
    return [array.slice(0, i), array.slice(i)];
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

  function applyOperation(collection, operation) {
    let [ op, val ] = operation;
    return typeof val !== 'undefined' ? collection[op](val) : collection[op]();
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
};
