const assert = require('assert');
const random = require('..');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

console.log('测试随机性...');
for (let i = 0; i < 100000; i += 1) {
  assert(/^[a-f0-9]{24}$/.test(random()));
  assert(random() !== random());
}

console.log('测试1秒内生成ID的时间正确性...');
let lastId = '';
for (let date = 1587984263235; date <= 1587984263999; date += 1) {
  let id = random(date);
  // console.log(date, '->', id);
  assert(/^5ea6b787/.test(id));
  assert(id > lastId);
  lastId = id;

  assert(/^5ea6b787/.test(random(new Date(date))));
}

console.log('测试生成的ID时间正确性...');
(async () => {
  for (let i = 0; i < 10000; i += 1) {
    let time = Date.now();
    let id = random();
    await delay(1);
    if (time === Date.now()) await delay(1);
    assert(random() > id);
  }
})();
