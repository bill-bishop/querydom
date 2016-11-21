let cheerio = require('cheerio');

function parseDom(body, selector) {
  return cheerio.load(body)(selector);
}

module.exports = parseDom;
