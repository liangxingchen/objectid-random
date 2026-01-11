/**
 * MongoDB ObjectId 风格的随机字符串生成器
 *
 * 生成的字符串格式：24 字符十六进制字符串 `[a-f0-9]{24}`
 *
 * 结构说明：
 * - 前 12 个字符：基于输入日期的毫秒级时间戳，转换为秒后转为十六进制（包含小数点后的毫秒部分），截取前 12 个字符
 * - 后 12 个字符：随机十六进制字符串
 *
 * 与 MongoDB ObjectId 的差异：
 * - 时间戳长度：本库使用 12 字符毫秒级，MongoDB 使用 8 字符秒级，之后是机器标识等
 * - 机器标识、进程 ID、计数器：本库用随机值替代
 * - 单调性：本库同一毫秒内生成的 ID 不保证自增性，MongoDB 自增
 * - 格式兼容：生成的字符串符合 ObjectId 格式，但不是真实的 ObjectId
 */
declare namespace objectidRandom {}

/**
 * 生成 MongoDB ObjectId 风格的随机 24 字符十六进制字符串
 *
 * @param date - 可选的日期对象、毫秒时间戳或具有 `getTime()` 方法的对象
 *   - 如果是 `Date` 对象：使用该日期的时间戳
 *   - 如果是 `number`：直接作为毫秒时间戳
 *   - 如果是具有 `toDate()` 方法的对象（如 Mongoose Date）：先转换为 Date
 *   - 如果是具有 `getTime()` 方法的对象：直接调用获取毫秒时间戳
 *   - 如果未提供：使用当前时间 `Date.now()`
 *
 * @returns 24 字符的十六进制字符串，格式为 `[a-f0-9]{24}`
 *
 * @example
 * ```typescript
 * import random from 'objectid-random';
 *
 * // 使用当前时间生成（最常用）
 * const id1 = random(); // '5ea6b7873c284f279c4afd60'
 *
 * // 使用指定的 Date 对象
 * const id2 = random(new Date('2020-04-27')); // '5ea73167xxxxxxxxxxxxxxx'
 *
 * // 使用毫秒时间戳
 * const id3 = random(1587984263235); // '5ea6b7873c284f279c4afd60'
 *
 * // 使用 Mongoose Date 对象
 * const mongooseDate = new mongoose.Types.ObjectId();
 * const id4 = random(mongooseDate); // '5ea6b787xxxxxxxxxxxxxxx'
 * ```
 *
 * @remarks
 * - 前 12 个字符包含：秒级时间戳的十六进制（约 8 字符）+ 小数点后的毫秒十六进制部分
 * - 十六进制时间戳部分确保 12 个字符，不足用 '0' 填充
 * - 剩余 12 个字符由 `Math.random()` 生成的随机十六进制填充
 * - 同一毫秒内生成的多个 ID 前 12 个字符相同，后缀完全随机，不保证自增性
 *
 */
declare function objectidRandom(
  date?: Date | number | { getTime(): number } | { toDate: () => { getTime(): number } }
): string;

export = objectidRandom;
