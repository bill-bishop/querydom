#!/usr/bin/env node

module.exports = function (process, exit) {
  let parseDom = require('../lib/parseDom');
  let args = splitArr(process.argv.slice(2), /^--/);
  let selector = args[0].pop();
  let input = args[0].pop();
  let operations = args[1].map(op => op.replace(/^--/, '').split('='));

  if (typeof input === 'undefined') {
    input = '';
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', data => input += data);
    process.stdin.on('end', writeOutput);
  }
  else {
    writeOutput();
  }

  function writeOutput() {
    let output = parseDom(input, selector);

    if (!operations.length) {
      output = output.text();
    }

    for (let operation of operations) {
      let [ op, val ] = operation;

      if (typeof val === 'undefined') {
        output = output[op]();
      }
      else {
        output = output[op](val);
      }
    }

    process.stdout.write(output + '\n');
    exit(0);
  }

  function splitArr(array, pattern) {
    i = -1;
    for (let e of array) {
      if (/^--/.test(e)) break;
      i++;
    }
    return [array.slice(0, i+1), array.slice(i+1)];
  }
};
