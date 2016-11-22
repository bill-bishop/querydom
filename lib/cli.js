#!/usr/bin/env node

module.exports = function (process, exit) {
  let operation = 'text';
  let args = process.argv.slice(2);
  let selector = args.pop();
  let arg = selector;
  let parseDom = require('../lib/parseDom');
  let opValue;

  if (/^--/.test(arg)) {
    let op = arg.replace(/^--/, '').split('=');
    operation = op[0];
    opValue = op[1];
    selector = args.pop();
  }

  let input = args.pop();

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
    let output = parseDom(input, selector)[operation](opValue);
    process.stdout.write(output + '\n');
    exit(0);
  }
};
