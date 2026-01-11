# objectid-random - 项目知识库

**生成时间**: 2026-01-11
**Commit**: ac6691d
**分支**: main

## 概述

生成 MongoDB ObjectId 风格的随机 24 字符十六进制字符串。极简单函数库，零依赖。

## 结构

```
objectid-random/
├── index.js         # 主入口，导出 random(date) 函数
├── index.d.ts       # TypeScript 类型定义
├── package.json     # npm 包配置
├── .prettierrc.js   # Prettier 格式化配置（中文注释）
├── .gitignore       # Git 忽略规则
├── .npmignore       # npm 发布忽略规则
├── LICENSE          # MIT 许可证
├── README.md        # 项目说明
└── tests/
    └── index.js     # 测试文件（直接 node 执行，无测试框架）
```

## 快速定位

| 任务         | 位置             | 备注                          |
| ------------ | ---------------- | ----------------------------- |
| 主函数实现   | `index.js`       | 34 行，核心逻辑               |
| 函数签名     | `index.d.ts`     | TypeScript 类型               |
| 运行测试     | `npm test`       | 直接 node 执行 tests/index.js |
| 修改格式规则 | `.prettierrc.js` | 120 字符宽度，单引号          |

## 代码映射

| 符号      | 类型 | 位置     | 引用 | 角色           |
| --------- | ---- | -------- | ---- | -------------- |
| `random`  | 函数 | index.js | -    | 导出主函数     |
| `getTime` | 函数 | index.js | 内部 | 时间戳转换     |
| `pads`    | 常量 | index.js | -    | 填充字符串数组 |

## 规范

### 代码格式（Prettier 强制）

- **行宽**: 120 字符（超出默认 80）
- **缩进**: 2 空格
- **引号**: 单引号
- **分号**: 必须
- **行尾**: LF（POSIX）
- **尾随逗号**: 无
- **箭头函数参数**: 始终用括号

### 模块格式

- CommonJS：`module.exports`, `require`
- 不使用 ES 模块（`import/export`）
- 类型定义通过单独的 `.d.ts` 文件提供

### 测试

- 无测试框架（Jest、Mocha 等）
- 使用原生 `assert` 模块
- 直接 `node tests/index.js` 执行
- 测试导入：`const random = require('..')`

## 反模式（本项目）

**不要**：

- 修改 `.npmignore` 中的 `tests` 条件（测试目录不应发布到 npm）
- 添加 CI/CD 配置（项目刻意保持极简）
- 引入测试框架（当前原生 Node.js 足够）

## 独特风格

1. **扁平结构**：源代码直接在根目录，无 `src/` 或 `lib/` 目录
2. **零依赖**：无任何 npm 依赖
3. **无构建过程**：直接发布原始 JavaScript
4. **性能测试**：单次运行 100,000+ 次断言
5. **中文注释**：`.prettierrc.js` 中使用中文说明配置

## 命令

```bash
npm test          # 运行测试（node tests/index.js）
npm publish       # 发布到 npm
```

## 注意事项

- **时间戳精度**：使用毫秒级时间戳作为前 12 个字符
- **格式保证**：返回 24 字符十六进制字符串 `[a-f0-9]{24}`
- **单调性**：同一毫秒内生成的多个 ID 不保证自增性，后缀完全随机
- **Date 兼容性**：支持 Date 对象、时间戳数字、Date.getTime()
- **console.log**：tests/index.js 第 22 行有调试日志（生产代码）
