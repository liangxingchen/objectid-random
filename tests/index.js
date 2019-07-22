const assert = require('assert');
const random = require('..');

for (let i = 0; i < 100000; i += 1) {
  assert(/^[a-f0-9]{24}$/.test(random()));
  assert(random() !== random());
}
