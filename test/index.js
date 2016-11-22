let chai     = require('chai');
let assert   = require('assert');
let run      = require("test-cli");
let stdin    = run.stdin;
let parseDom = require('../lib/parseDom');
let cli = require('../lib/cli');

describe('parseDom', function () {
  it('should parse the dom', function () {
    let result = parseDom('<div class="lol">Apple</div>', 'div.lol');
    assert.equal(result.text(), 'Apple');
  });
});

describe('CLI', function () {
  let querydom = run.bind(null, cli);

  it('should read from stdin', function (done) {
    querydom('span.citrus', stdin('<span class="citrus">Grapefruit</span>'), function (stdout, stderr, code) {
      assert.equal(stdout, 'Grapefruit\n');
      done();
    });
  });

  it('should read from args only', function (done) {
    querydom('<div>Orange</div>', 'div', function (stdout, stderr, code) {
      assert.equal(stdout, 'Orange\n');
      done();
    });
  });

  describe('--attr=*', function () {
    it('should output the attr value', function (done) {
      let html = '<div name="billy" class="test">Orange</div>';
      let selector = 'div.test';
      let op = '--attr=name';
      let expectation = 'billy';

      querydom(html, selector, op, function (stdout, stderr, code) {
        assert.equal(stdout, expectation + '\n');
        done();
      });
    });
  });

  describe('chaining', function () {
    it('should allow multiple jquery operations', function (done) {
      let html = `<div class="parent">
                    parent text
                    <div class="child" id="success">child text</div>
                  </div>`;


      querydom(html, 'div.child', '--parent', '--find=.child', '--attr=id', function (stdout, stderr, code) {
        assert.equal(stdout, 'success\n');
        done();
      });
    });
  });
});
