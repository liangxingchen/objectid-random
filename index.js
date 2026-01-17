'use strict';

const pads = ['', '0', '00', '000', '0000', '00000', '000000', '0000000'];

function getTime(date) {
  if (date) {
    if (typeof date === 'object') {
      if (typeof date.toDate === 'function') {
        date = date.toDate();
        if (!(date instanceof Date)) {
          return Date.now() / 1000;
        }
      }
      if (typeof date.getTime === 'function') {
        date = date.getTime();
      }
    }
    if (date && typeof date === 'number') {
      if (date < 0 || date === Infinity) {
        throw new Error('Invalid date');
      }
      return date / 1000;
    }
  }
  return Date.now() / 1000;
}

function random(date) {
  let [second, millisecond] = getTime(date).toString(16).split('.');
  if (second.length < 8) {
    second = pads[8 - second.length] + second;
  }
  let result = (second + (millisecond || '')).substring(0, 12);
  if (result.length < 12) {
    result += pads[12 - result.length];
  }
  while (result.length < 24) {
    result += Math.random()
      .toString(16)
      .substring(2, 26 - result.length);
  }
  return result;
}

module.exports = random;
