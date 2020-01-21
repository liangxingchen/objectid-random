const assert = require('assert');
const random = require('..');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

for (let i = 0; i < 100000; i += 1) {
  assert(/^[a-f0-9]{24}$/.test(random()));
  assert(random() !== random());
}

(async () => {
  for (let i = 0; i < 10000; i += 1) {
    let id = random();
    await delay(1);
    assert(random() > id);
  }
})();
