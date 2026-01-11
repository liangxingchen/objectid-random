# objectid-random

生成 MongoDB ObjectId 风格的随机 24 字符十六进制字符串。

## 特性

- 🎯 **零依赖** - 纯 JavaScript，无任何外部依赖
- ⚡ **极简 API** - 只有一个函数 `random()`
- 📅 **时间戳支持** - 可指定日期生成基于该时间的 ID
- 🔤 **类型安全** - 内置 TypeScript 类型定义
- 📦 **超小体积** - 仅 34 行源代码

## 使用场景

- 浏览器前端没有 mongodb 依赖情况下使用
- 生成指定时间的 ID
  - 直接使用`ObjectId.createFromTime()`生成的 ID 第 9 位以后全部是 0
  - 可以结合本库生成 `new ObjectId(random())`

## 安装

```bash
npm install objectid-random
```

## 快速开始

```javascript
const random = require('objectid-random');

// 使用当前时间生成（最常用）
const id = random();
console.log(id); // '5ea6b7873c284f279c4afd60'

// 验证格式
console.log(/^[a-f0-9]{24}$/.test(id)); // true
```

## 使用示例

### 1. 生成随机 ID（最常用）

```javascript
const random = require('objectid-random');

// 不传参数，使用当前时间
const id = random();
console.log(id); // '6789abcd1234567890123456'
```

### 2. 使用指定的 Date 对象

```javascript
const random = require('objectid-random');

const specificDate = new Date('2024-01-01T00:00:00Z');
const id = random(specificDate);
console.log(id); // '6568d800xxxxxxxxxxxxxxxx'
```

### 3. 使用毫秒时间戳

```javascript
const random = require('objectid-random');

// 使用 Date.getTime() 获取的毫秒时间戳
const timestamp = Date.now();
const id = random(timestamp);
console.log(id);

// 使用历史时间戳
const historicalId = random(946684800000); // 2000-01-01 00:00:00 UTC
console.log(historicalId); // '3b63a800xxxxxxxxxxxxxxxx'
```

## API 参考

### `random([date])`

生成 MongoDB ObjectId 风格的随机 24 字符十六进制字符串。

#### 参数

| 参数   | 类型                       | 必填 | 默认值   | 说明                                                    |
| ------ | -------------------------- | ---- | -------- | ------------------------------------------------------- |
| `date` | `Date \| number \| object` | 否   | 当前时间 | 可选的日期对象、毫秒时间戳或具有 `getTime()` 方法的对象 |

#### 返回值

返回一个 24 字符的十六进制字符串，格式为 `[a-f0-9]{24}`。

#### 参数类型详解

1. **不传参数**：使用当前时间 `Date.now()`

   ```javascript
   const id = random(); // 当前时间
   ```

2. **`Date` 对象**：使用该日期的时间戳

   ```javascript
   const id = random(new Date('2024-01-01'));
   ```

3. **`number` 类型**：直接作为毫秒时间戳

   ```javascript
   const id = random(1704067200000); // 2024-01-01 00:00:00 UTC
   ```

4. **具有 `getTime()` 方法的对象**：调用该方法获取时间戳

   ```javascript
   const id = random({ getTime: () => Date.now() });
   ```

5. **具有 `toDate()` 方法的对象**（如 Moment）：先转换为 Date

   ```javascript
   const now = moment();
   const id = random(now);
   ```

## TypeScript 类型定义

```typescript
/**
 * 生成 MongoDB ObjectId 风格的随机 24 字符十六进制字符串
 *
 * @param date - 可选的日期对象、毫秒时间戳或具有 getTime() 方法的对象
 * @returns 24 字符的十六进制字符串，格式为 `[a-f0-9]{24}`
 */
declare function objectidRandom(
  date?: Date | number | { getTime(): number } | { toDate: () => { getTime(): number } }
): string;

export = objectidRandom;
```

### TypeScript 使用示例

```typescript
import random from 'objectid-random';

// 不传参数
const id1: string = random();

// 传入 Date 对象
const id2: string = random(new Date());

// 传入时间戳
const id3: string = random(1704067200000);
```

## 内部实现

生成的 ID 结构：

```
[时间戳 12 字符] [随机值 12 字符]
```

- **前 12 字符**：基于输入日期的毫秒级时间戳，转换为秒后转为十六进制（包含小数点后的毫秒部分），截取前 12 个字符
  - 其中包含：秒级时间戳的十六进制（约 8 字符）+ 小数点后的毫秒十六进制部分
- **后 12 字符**：由 `Math.random()` 生成的随机十六进制字符串

### 与 MongoDB ObjectId 的对比

| 特性       | MongoDB ObjectId         | objectid-random                    |
| ---------- | ------------------------ | ---------------------------------- |
| 时间戳长度 | 8 字符（纯秒级十六进制） | 12 字符（秒级十六进制 + 毫秒部分） |
| 机器标识   | 有                       | 无（毫秒）                         |
| 进程 ID    | 有                       | 无（用随机替代）                   |
| 计数器     | 有                       | 无（用随机替代）                   |
| 格式兼容   | ✓                        | ✓                                  |
| 单调性     | 同一秒内自增             | 同一毫秒内不保证自增性（随机）     |

> 注意：本库生成的 ID **不是真实的 MongoDB ObjectId**，但格式兼容，可以用于 MongoDB `_id` 字段。

## 常见问题

### Q: 生成的是真实的 MongoDB ObjectId 吗？

A: 不是。格式兼容（都是 24 字符十六进制字符串），但 MongoDB ObjectId 包含机器标识、进程 ID 和计数器，本库用随机值替代这些部分。

### Q: 相同时间生成的 ID 会重复吗？

A: 不会。虽然同一毫秒内生成的 ID 前 12 个字符（时间戳部分 + 毫秒部分）相同，但后 12 个字符是随机生成的，每次调用都不同。

**注意**：同一毫秒内生成的多个 ID **不保证自增性**，后缀完全随机。如果需要自增性，请使用 MongoDB 的原生 ObjectId。

### Q: 可以用于 MongoDB 的 `_id` 字段吗？

A: 不可以。本库生成的是字符串，并不是 MongoDB ObjectId 对象，但是可以通过 `ObjectId(id)` 转换为 MongoDB 的 ObjectId 对象。

```javascript
// 使用本库生成的 ID
await db.collection('users').insertOne({
  _id: new ObjectId(random(specificDate)),
  name: 'Alice'
});
```

## 许可证

MIT

## 作者

Liang - [GitHub](https://github.com/liangxingchen)
