
function random() {
  var result = parseInt(Date.now() / 1000).toString(16);
  while (result.length < 24) {
    result += Math.random().toString(16).substr(2);
  }
  return result.substr(0, 24);
}

module.exports = random;
