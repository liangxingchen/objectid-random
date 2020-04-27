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

let lastId = '';
for (let date = 1587984263235; date <= 1587984263999; date += 1) {
  let id = random(date);
  console.log(date, '->', id);
  assert(/^5ea6b787/.test(id));
  assert(id > lastId);
  lastId = id;

  assert(/^5ea6b787/.test(random(new Date(date))));
}
