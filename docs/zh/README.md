# 🧩 Combinare

<p align="center">
  <img src="../../assets/logo.png" alt="Combinare 标志">
  <br />
  <strong>一个多用途 JavaScript/TypeScript 库，用于类型安全的组合、排列和笛卡尔积。</strong>
  <br />
  把简单输入变成商品规格、测试场景和更多可能性，在应用或终端中轻松使用。
</p>

[![npm version](https://img.shields.io/npm/v/combinare)](https://www.npmjs.com/package/combinare)
[![CI](https://github.com/Hangell/combinare/actions/workflows/ci.yml/badge.svg)](https://github.com/Hangell/combinare/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://github.com/Hangell/combinare/blob/main/LICENSE)

[🇺🇸 English](https://github.com/Hangell/combinare/blob/main/README.md) · [🇧🇷 Português (Brasil)](https://github.com/Hangell/combinare/blob/main/docs/pt/README.md) · [🇪🇸 Español](https://github.com/Hangell/combinare/blob/main/docs/es/README.md) · [🇷🇺 Русский](https://github.com/Hangell/combinare/blob/main/docs/ru/README.md) · **🇨🇳 简体中文** · [🇮🇳 हिन्दी](https://github.com/Hangell/combinare/blob/main/docs/hi/README.md)

**把输入数据变成更多可能性。** Combinare 是一个用于组合、排列和笛卡尔积的 TypeScript/JavaScript 库，同一个 npm 包也提供可选 CLI。无需为每个任务重新编写嵌套循环，即可生成商品规格、构建测试矩阵、选择分组、探索有序场景或创建数字样本。

[选择合适的操作](#choose-an-operation) · [快速开始](#quick-start) · [API 概览](#api-reference) · [可选 CLI](#cli) · [限制与错误处理](#limits)

<a id="why-combinare"></a>

## 为什么选择 Combinare？

- **覆盖多种问题：**选择一组元素、安排它们的顺序，或从每个独立维度中选择一个值。
- **支持 TypeScript：**泛型结果、readonly 数组输入、导出的选项类型以及类型安全的排序键。
- **无运行时依赖：**使用命名函数或熟悉的静态 `Combinare` API。
- **只生成需要的结果：**使用迭代器处理大型空间中的少量结果，然后提前停止。
- **明确的限制和可预期的行为：**返回数组的生成函数限制结果数量；无效数字请求会报错，而不会无限重试。
- **库与终端两种用法：**将 API 集成到应用中，或在 shell 中执行 JSON 命令。

<a id="choose-an-operation"></a>

## 选择合适的操作

| 目标                               | 使用                           | 示例                                  |
| ---------------------------------- | ------------------------------ | ------------------------------------- |
| 选择一组元素，不考虑顺序           | `combinations`                 | 从 3 人中选 2 人：3 组                |
| 选择或安排元素，考虑顺序           | `permutations`                 | 从 3 个元素中选有序对：6 行           |
| 从每个独立列表选择一个值           | `cartesianProduct`             | 2 种尺寸 × 2 种颜色：4 种规格         |
| 重新组合示例对象中的属性值         | `objectCombinations`           | 根据样本生成尺寸和颜色组合            |
| 请求有限数量的不重复数字行         | `generateCombinationsNumerics` | 5 个样本，每个包含 1–49 中的 6 个数字 |
| 不分配结果数组，计算无序选择的数量 | `countCombinations`            | 用 BigInt 精确计算 C(100, 50)         |
| 根据某个键排序已有记录             | `sortByObjectForAttribute`     | 根据价格或库存排序商品                |

<a id="installation"></a>

## 安装

需要 **Node.js 22.14+**。库也可以通过打包工具用于支持 ES2022 和 BigInt 的现代浏览器。浏览器构建应导入包的主入口；CLI 使用 Node.js，并有独立入口。

```sh
npm install combinare
# yarn add combinare
# pnpm add combinare
```

<a id="quick-start"></a>

## 快速开始

从命名导入开始。组合从一个列表中选择元素；笛卡尔积从每个列表中选择一个元素。

```ts
import { combinations, cartesianProduct } from 'combinare';

const pairs = combinations(['Alice', 'Bob', 'Carol'], 2);
console.log(pairs);
// [['Alice', 'Bob'], ['Alice', 'Carol'], ['Bob', 'Carol']]

const variants = cartesianProduct([
  ['S', 'L'],
  ['red', 'blue'],
]);
console.log(variants);
// [['S', 'red'], ['S', 'blue'], ['L', 'red'], ['L', 'blue']]
```

也支持 CommonJS。所有公开函数都可以作为 `Combinare` 的静态方法使用，请选择适合项目的导入方式。

```js
const { Combinare, combinations } = require('combinare');
console.log(Combinare.countCombinations(4, 2).toString()); // '6'
console.log(combinations([1, 2, 3], 2)); // [[1, 2], [1, 3], [2, 3]]
```

<a id="cartesian-products"></a>

## 生成商品规格和测试矩阵

当各维度相互独立时，笛卡尔积可以表示所有可能的配置。这适用于商品规格、功能设置和参数化测试。下面的两个角色 × 两种设备 × 两种主题会生成八个场景。

```ts
import { cartesianProduct } from 'combinare';

const scenarios = cartesianProduct([
  ['admin', 'member'],
  ['desktop', 'mobile'],
  ['light', 'dark'],
]).map(([role, device, theme]) => ({ role, device, theme }));

console.log(scenarios.length); // 8
console.log(scenarios[0]);
// { role: 'admin', device: 'desktop', theme: 'light' }
```

最后一个维度变化最快。每一行都恰好包含每个输入列表中的一个值。可以将结果映射为业务对象，再交给测试工具或应用程序。

<a id="combinations-and-permutations"></a>

## 选择分组或探索排列顺序

对于团队、商品组合或子集，使用组合：`[A, B]` 和 `[B, A]` 表示同一个选择。对于序列和任务分配，使用排列：顺序不同就是不同结果。

```ts
import { combinations, permutations } from 'combinare';

console.log(combinations(['A', 'B', 'C'], 2));
// [['A', 'B'], ['A', 'C'], ['B', 'C']]

console.log(permutations(['A', 'B', 'C'], 2));
// [['A', 'B'], ['A', 'C'], ['B', 'A'], ['B', 'C'], ['C', 'A'], ['C', 'B']]

console.log(permutations(['A', 'B']));
// [['A', 'B'], ['B', 'A']]
```

两个函数都不会重复使用同一个输入位置。省略排列长度时，会排列全部输入元素；指定较小长度时，会生成有序选择。

<a id="object-combinations"></a>

## 组合对象属性

已经有示例对象？可以直接根据它们的共有属性生成变体，无需手动提取每一份值列表。每个键的不同取值会先收集，再进行重新组合。

```ts
import { objectCombinations, Combinare } from 'combinare';

const samples = [
  { size: 'S', color: 'red' },
  { size: 'L', color: 'blue' },
];

console.log(objectCombinations(samples));
// [{ size: 'S', color: 'red' }, { size: 'S', color: 'blue' },
//  { size: 'L', color: 'red' }, { size: 'L', color: 'blue' }]

console.log(Combinare.generateCombinationsObjects([{ a: 1 }, { a: 2 }]));
// [[{ a: 1 }], [{ a: 2 }]]
```

**各属性是独立组合的。**结果可能包含原样本中不存在的配置；如果某些值不能同时使用，请应用自己的业务规则。只有第一个对象中由 `Object.keys` 列出的自有字符串键，并且所有对象都具有的键，才会参与组合。新函数直接返回对象数组；旧方法保持每个对象包在单元素数组中的格式。

<a id="numeric-samples"></a>

## 生成互不重复的数字样本

从 `1..total` 范围中请求指定数量的不同行。每一行具有指定长度、不含重复数字，并按升序排列。当不需要枚举整个数字空间时，可用于模拟或示例数据。

```ts
import { generateCombinationsNumerics, countCombinations } from 'combinare';

const samples = generateCombinationsNumerics(49, 6, 5);
console.log(samples.length); // 5
console.log(samples.every((row) => row.length === 6)); // true
console.log(countCombinations(49, 6).toString()); // '13983816'

const repeatable = generateCombinationsNumerics(4, 2, 3, {
  random: () => 0.5,
});
console.log(repeatable); // [[1, 4], [2, 4], [2, 3]]
```

默认使用 `Math.random`；可以注入 `random: () => number` 来进行可重复的测试。该函数必须返回 `[0, 1)` 内的有限值。即使随机源始终返回常量，生成过程也会结束。序号抽样采用 53 位精度，**既不具备密码学安全性，也不是严格均匀抽样**，尤其是在大型空间中。请用于示例数据，不要用于安全令牌或受监管的抽奖。

<a id="sorting"></a>

## 排序而不改变原始数据

根据类型约束的键排序记录，同时保留原始数组的顺序。数字和字符串支持升序或降序；布尔值按 `false < true` 排序。默认顺序为 `asc`。

```ts
import { sortByObjectForAttribute } from 'combinare';

const products = [
  { name: 'Keyboard', price: 75, inStock: true },
  { name: 'Mouse', price: 25, inStock: false },
];

const affordableFirst = sortByObjectForAttribute(products, 'price', 'asc');
console.log(affordableFirst[0]?.name); // 'Mouse'
console.log(products[0]?.name); // 'Keyboard'

const availableFirst = sortByObjectForAttribute(products, 'inStock', 'desc');
console.log(availableFirst[0]?.name); // 'Keyboard'
```

相等值采用稳定排序。建议选择值有效且类型一致的键：混合类型、不支持的类型和 `NaN` 会被视为相等。字符串使用 JavaScript 字典序比较，不使用地区语言排序规则。返回数组中的对象仍保留原有引用。

<a id="exact-counts"></a>

## 先计数，再生成

组合空间增长很快。先计算无序选择的数量，再决定收集所有结果还是使用迭代器。结果为精确的 `bigint`，避免大数用 JavaScript `number` 表示时丢失精度。

```ts
import { countCombinations } from 'combinare';

const total = countCombinations(100, 50);
console.log(total); // 100891344545564193334812497256n
console.log(JSON.stringify({ total: total.toString() }));
// {"total":"100891344545564193334812497256"}
```

`countCombinations` 计算 C(total, size)，不是排列数量或笛卡尔积数量。size 大于 total 时返回 `0n`，size 为零时返回 `1n`。BigInt 不能直接 JSON 序列化；请使用 `.toString()`。精确计数没有计算量上限；非常大的 size 可能耗费较多时间。

<a id="iterators"></a>

## 使用迭代器处理大型组合空间

需要立即得到全部结果时，使用返回数组的函数。需要逐行处理、提前结束或避免分配整个空间时，使用迭代器。下面的示例只使用 75,287,520 个五元素选择中的三个。

```ts
import {
  iterateCombinations,
  iteratePermutations,
  iterateCartesianProduct,
} from 'combinare';

const items = Array.from({ length: 100 }, (_, i) => i + 1);
let processed = 0;
for (const row of iterateCombinations(items, 5)) {
  console.log(row);
  if (++processed === 3) break;
}

const firstOrder = iteratePermutations(['A', 'B', 'C']).next().value;
console.log(firstOrder); // ['A', 'B', 'C']

const firstVariant = iterateCartesianProduct([
  [1, 2],
  [3, 4],
]).next().value;
console.log(firstVariant); // [1, 3]
```

迭代器没有自动行数限制，也不会随机抽样。由你控制何时停止。使用 `Array.from()` 会分配全部结果，并绕过数组生成函数的限制。迭代期间不要修改输入数组或对象；参数验证在第一次调用 `next()` 时进行。

<a id="limits"></a>

## 限制与错误处理

返回数组的生成函数默认最多允许 **100,000 行**。超过 `maxResults` 会抛出 `RangeError`，不会静默截断结果。只有能容纳完整结果时才提高限制，否则使用迭代器。

```ts
import { cartesianProduct } from 'combinare';

const values = Array.from({ length: 400 }, (_, i) => i);
const rows = cartesianProduct([values, values], { maxResults: 200_000 });
console.log(rows.length); // 160000

try {
  cartesianProduct(
    [
      [1, 2],
      [3, 4],
    ],
    { maxResults: 3 }
  );
} catch (error) {
  console.log(error instanceof RangeError); // true
}
```

| 限制                  | 数值 / 规则                            |
| --------------------- | -------------------------------------- |
| 返回数组的行数        | 默认 100,000，可通过 `maxResults` 配置 |
| 数字范围（`total`）   | 最多 1,000,000                         |
| 每行数字个数          | 最多 1,000，且不超过 total             |
| 数字输出单元格数      | 长度 × 数量 ≤ 10,000,000               |
| 数字样本数量          | 不超过 maxResults 或 C(total, 长度)    |
| 数字参数和 maxResults | 非负安全整数                           |
| CLI JSON 输入         | 最多 1 MiB                             |

行数上限不是总内存保证：列数和值的大小同样重要。`maxResults` 为零时，只接受没有行的结果。负数、小数、非有限值、超出安全整数范围或不可能满足的数字请求会立即报错。

<a id="typescript"></a>

## TypeScript 集成

所有数组输入都支持 readonly。泛型跟随元素类型；当笛卡尔积不同维度的类型不一致时，请显式指定联合类型。导出的类型有 `GenerationOptions`、`NumericOptions`、`RandomSource` 和 `SortOrder`。

```ts
import {
  cartesianProduct,
  generateCombinationsNumerics,
  sortByObjectForAttribute,
  type GenerationOptions,
  type NumericOptions,
  type RandomSource,
  type SortOrder,
} from 'combinare';

const options: GenerationOptions = { maxResults: 1_000 };
const mixed = cartesianProduct<string | number>(
  [
    ['S', 'L'],
    [1, 2],
  ],
  options
);

const random: RandomSource = () => 0.5;
const numeric: NumericOptions = { ...options, random };
generateCombinationsNumerics(10, 2, 3, numeric);

const products = [{ price: 20 }, { price: 10 }];
const order: SortOrder = 'asc';
sortByObjectForAttribute(products, 'price', order);
// @ts-expect-error: 'missing' is not a key of the product type
sortByObjectForAttribute(products, 'missing', order);
```

`GenerationOptions` 包含 `maxResults?: number`；`NumericOptions` 增加 `random?: RandomSource`。`SortOrder` 为 `'asc' | 'desc'`。排序键被限制为 `keyof T`，可以在运行前发现无效属性名。

<a id="api-reference"></a>

## API 概览

下面的函数都是命名导出，也是 `Combinare` 的静态方法。`T` 由输入值推断；对象函数要求 `T extends object`。除非另有说明，options 参数均可省略。

| 函数                                                                                     | 返回值           | 用途                     |
| ---------------------------------------------------------------------------------------- | ---------------- | ------------------------ |
| `combinations(items, size, options?)`                                                    | `T[][]`          | 按位置生成无序选择       |
| `permutations(items, size = items.length, options?)`                                     | `T[][]`          | 按位置生成有序选择       |
| `cartesianProduct(arrays, options?)`                                                     | `T[][]`          | 每个维度选择一个元素     |
| `objectCombinations(objects, options?)`                                                  | `T[]`            | 重新组合共有属性         |
| `generateCombinationsNumerics(total, combinationLength, numberOfCombinations, options?)` | `number[][]`     | 不重复且已排序的数字样本 |
| `countCombinations(total, size)`                                                         | `bigint`         | 精确计算无序选择的数量   |
| `sortByObjectForAttribute(items, attribute, order = 'asc')`                              | `T[]`            | 稳定排序后的副本         |
| `iterateCombinations(items, size)`                                                       | `Generator<T[]>` | 惰性生成无序选择         |
| `iteratePermutations(items, size = items.length)`                                        | `Generator<T[]>` | 惰性生成有序选择         |
| `iterateCartesianProduct(arrays)`                                                        | `Generator<T[]>` | 惰性生成笛卡尔积行       |

### 原有方法名

- `Combinare.generateCombinationsArrays(arrays, options?)` 是 `cartesianProduct` 的别名，返回 `T[][]`。
- `Combinare.generateCombinationsObjects(objects, options?)` 将每个 `objectCombinations` 结果放入单独的数组，返回 `T[][]`。
- `Combinare.generateCombinationsNumerics(...)` 和 `Combinare.sortByObjectForAttribute(...)` 保留原有名称。

关于参数验证、相等规则和类型契约，请参阅[英文 API 详细参考](https://github.com/Hangell/combinare/blob/main/docs/API.md)；关于模块职责，请参阅[架构指南](https://github.com/Hangell/combinare/blob/main/docs/ARCHITECTURE.md)。

<a id="cli"></a>

## 可选 CLI

可以在终端直接使用同一个包。导入库不会执行 CLI。JSON 命令的结果可以重定向到文件，也可以传给其他程序。

```sh
npx combinare --help
npx combinare combinations '[1,2,3]' 2
# [[1,2],[1,3],[2,3]]
npx combinare cartesian '[["S","L"],["red","blue"]]'
npx combinare permutations '["A","B","C"]' 2
npx combinare objects '[{"a":1},{"a":2}]'
npx combinare numbers 49 6 5
npx combinare sort '[{"price":20},{"price":10}]' price asc
npx combinare count 100 50
npx combinare cartesian '[[1,2],[3,4]]' --max-results 4
```

```sh
npm install --global combinare
combinare --version
combinare combinations '[1,2,3]' 2 > pairs.json
```

| 命令                                                       | 输出                                  |
| ---------------------------------------------------------- | ------------------------------------- |
| `combinare numbers <total> <length> <amount>`              | 不重复且已排序的数字行                |
| `combinare combinations <json-array> <length>`             | 无序选择，JSON 格式                   |
| `combinare permutations <json-array> [length]`             | 有序选择，JSON 格式；默认使用全部长度 |
| `combinare cartesian <json-array-of-arrays>`               | 笛卡尔积行，JSON 格式                 |
| `combinare objects <json-array-of-objects>`                | 直接返回重组对象，JSON 格式           |
| `combinare sort <json-array-of-objects> <key> [asc\|desc]` | 排序记录，JSON 格式；默认 asc         |
| `combinare count <total> <length>`                         | 精确整数的十进制文本                  |
| `combinare --help`                                         | 用法和示例                            |
| `combinare --version`                                      | 已安装的包版本                        |

成功命令写入 **stdout**，退出码为 **0**。错误写入 **stderr**，退出码为 **1**，不产生部分 stdout。`--max-results <integer>` 设置返回数组时的生成行数限制。不提供交互提示，也不读取文件/stdin；请通过命令参数传入 JSON。示例使用 POSIX 引号，请按终端调整。开发期间先执行 `npm run build`，再执行 `node dist/cli.js --help`。本说明介绍 2.x 源码；`npx` 使用 npm 上可用的版本。

<a id="behavior"></a>

## 空输入、重复值与引用

| 输入或行为                                    | 结果                                            |
| --------------------------------------------- | ----------------------------------------------- |
| `combinations([], 0)` / `permutations([], 0)` | `[[]]`：一个空选择                              |
| `cartesianProduct([])`                        | `[[]]`：一个空积                                |
| 笛卡尔积中包含空因子                          | `[]`：没有可生成的行                            |
| 选择长度大于输入长度                          | 组合/排列返回 `[]`；数字生成抛出错误            |
| `objectCombinations([])`                      | `[]`                                            |
| 非空对象列表没有共有键                        | `[{}]`                                          |
| 组合/排列中的重复值                           | 位置被视为不同，值相同的行可能重复              |
| 笛卡尔积因子中的重复值                        | 保留                                            |
| 对象属性值                                    | 使用 `Set` / SameValueZero 去重；对象按引用比较 |
| 修改输入                                      | 不修改；返回新行/数组，但不深拷贝内部值         |

<a id="migration"></a>

## 从 1.x 迁移

原有静态 API 名称仍可使用，但 **2.0 改变了部分行为**：

- 保存 `sortByObjectForAttribute` 的返回值：不再就地排序原始数组。
- 显式导入 `Combinare`；导入不会赋值 `window.Combinare` 或 `global.Combinare`。
- 使用打包工具中的包导入代替旧的 `dist/combinare.min.js` 浏览器 bundle。
- 生成超过 100,000 行时，使用 `maxResults` 或迭代器。
- 对无效或不可能的数字请求处理 `RangeError`。
- 对象生成使用共有自有键和 `Set` 相等规则；需要平铺结果时用 `objectCombinations`，需要单元素数组包装时用旧 API。

完整迁移说明见 [CHANGELOG](https://github.com/Hangell/combinare/blob/main/CHANGELOG.md)。源码已准备为 2.0.0；更新文档不会发布版本。

<a id="development"></a>

## 开发与贡献

使用 Node.js 22.14+ 或 24 和 npm。`check` 运行 ESLint、Prettier、TypeScript、行/分支/函数最低 90% 的覆盖率检查，以及实际安装 tarball 的消费者验证，检查 CommonJS、ESM 导入、类型声明和 npm 可执行命令。Husky 在开发提交时运行 lint-staged 和 Conventional Commits 验证。配置、发布与翻译更新请参阅 [CONTRIBUTING](https://github.com/Hangell/combinare/blob/main/CONTRIBUTING.md)。

```sh
npm ci
npm run check
npm run build
node dist/cli.js --help
```

<a id="community"></a>

## 社区、作者与许可证

欢迎改进示例、文档、测试和 API。请遵守[行为准则](https://github.com/Hangell/combinare/blob/main/CODE_OF_CONDUCT.md)，通过 [GitHub issues](https://github.com/Hangell/combinare/issues) 报告普通问题，并根据[安全政策](https://github.com/Hangell/combinare/blob/main/SECURITY.md) 私下报告漏洞。

**Combinare** 来自拉丁语动词，意为“组合”或“连接”。作者：[Rodrigo Rangel / Hangell](https://github.com/Hangell) · [hangell.org](https://hangell.org)。采用 [MIT 许可证](https://github.com/Hangell/combinare/blob/main/LICENSE)。

支持：PIX `rodrigo@hangell.org` · 加密货币/NFT `0xEd4d1be72F807Faa358C966a8eF63367c200130F`。
