const pads = ['', '0', '00', '000', '0000'];
function random() {
  var result = (Date.now() / 1000)
    .toString(16)
    .replace('.', '')
    .substr(0, 12);
  if (result.length < 12) {
    result += pads[12 - result.length];
  }
  while (result.length < 24) {
    result += Math.random()
      .toString(16)
      .substr(2, 24 - result.length);
  }
  return result;
}

module.exports = random;
