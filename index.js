var pads = ['', '0', '00', '000', '0000', '00000', '000000'];

function getTime(date) {
  if (date) {
    if (typeof date === 'object') {
      if (date.toDate) {
        date = date.toDate();
      }
      if (date.getTime) {
        date = date.getTime();
      }
    }
    if (date && typeof date === 'number') {
      return date / 1000;
    }
  }
  return Date.now() / 1000;
}

function random(date) {
  var result = getTime(date).toString(16).replace('.', '').substr(0, 12);
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
