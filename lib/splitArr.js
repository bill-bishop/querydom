module.exports = function splitArr(array, pattern) {
  i = 0;
  for (let e of array) {
    if (pattern.test(e)) break;
    i++;
  }
  return [array.slice(0, i), array.slice(i)];
}
